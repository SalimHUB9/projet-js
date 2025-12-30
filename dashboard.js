let chart;

function updateDashboard() {

  document.getElementById("kpi-films").innerText = films.length;
  document.getElementById("kpi-reals").innerText = reals.length;

  let moyenne = 0;
  if (films.length > 0) {
    let somme = films.reduce((t, f) => t + Number(f.note), 0);
    moyenne = (somme / films.length).toFixed(1);
  }

  document.getElementById("kpi-moyenne").innerText =
    Number(moyenne).toLocaleString("fr-FR");

  const genres = {};

  films.forEach(f => {
    if (!genres[f.genre]) genres[f.genre] = { total: 0, count: 0 };
    genres[f.genre].total += Number(f.note);
    genres[f.genre].count++;
  });

  const labels = Object.keys(genres);
  const values = labels.map(g =>
    (genres[g].total / genres[g].count).toFixed(1)
  );

  const ctx = document.getElementById("filmsChart");
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Moyenne des notes par genre",
        data: values,
        backgroundColor: "#e10600",
        barThickness: 30
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 10
        }
      }
    }
  });
}

