let chart = null;

function updateDashboard() {
  // قراءة مباشرة من localStorage
  const filmsLS = JSON.parse(localStorage.getItem("films")) || [];
  const realsLS = JSON.parse(localStorage.getItem("reals")) || [];

  // KPI
  document.getElementById("kpi-films").innerText = filmsLS.length;
  document.getElementById("kpi-reals").innerText = realsLS.length;

  let avg = 0;
  if (filmsLS.length > 0) {
    avg = (
      filmsLS.reduce((s, f) => s + Number(f.note), 0) / filmsLS.length
    ).toFixed(1);
  }
  document.getElementById("kpi-moyenne").innerText = avg.replace(".", ",");

  // Table détails
  const tbody = document.getElementById("dashboardFilms");
  tbody.innerHTML = "";
  filmsLS.slice(-5).reverse().forEach(f => {
    tbody.innerHTML += `
      <tr>
        <td>${f.titre}</td>
        <td>${f.genre}</td>
        <td>${f.annee}</td>
        <td>${f.note}</td>
        <td>${f.realisateur}</td>
        <td>${f.source}</td>
      </tr>
    `;
  });

  // Chart
  chart = new Chart(canvas.getContext("2d"), {
  type: "bar",
  data: {
    labels: filmsLS.map(f => f.titre),
    datasets: [{
      label: "Notes des films",
      data: filmsLS.map(f => Number(f.note)),
      backgroundColor: "#e10600"
    }]
  },
  options: {
    responsive: false,
    scales: {
      y: { beginAtZero: true, max: 10 }
    }
  }
});

}
