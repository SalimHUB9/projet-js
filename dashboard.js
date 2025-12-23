let chart;

function updateDashboard(){
  document.getElementById("kpi-films").innerText = films.length;
  document.getElementById("kpi-reals").innerText = reals.length;

  let avg = films.length
    ? (films.reduce((s,f)=>s+Number(f.note),0)/films.length).toFixed(1)
    : 0;
  document.getElementById("kpi-notes").innerText = avg;

  const genres = {};
  films.forEach(f=>genres[f.genre]=(genres[f.genre]||0)+1);

  if(chart) chart.destroy();
  chart = new Chart(document.getElementById("filmsChart"),{
    type:"bar",
    data:{
      labels:Object.keys(genres),
      datasets:[{data:Object.values(genres)}]
    }
  });
}

updateDashboard();