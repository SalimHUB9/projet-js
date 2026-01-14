let chart;

function updateDashboard() {

  // ===== KPI =====
  document.getElementById("kpi-films").innerText = films.length;
  document.getElementById("kpi-reals").innerText = reals.length;

  let moyenne = 0;
  if (films.length > 0) {
    const somme = films.reduce((t, f) => t + Number(f.note), 0);
    moyenne = (somme / films.length).toFixed(1);
  }

  document.getElementById("kpi-moyenne").innerText =
    Number(moyenne).toLocaleString("fr-FR");

  // ===== CHART PAR FILMS =====
  const labels = films.map(f => f.titre);
  const values = films.map(f => Number(f.note));

  const ctx = document.getElementById("filmsChart");
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Notes des films (/10)",
        data: values,
        backgroundColor: "#e10600",
        barThickness: 30
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 10
        }
      }
    }
  });
} 