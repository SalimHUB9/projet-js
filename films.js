let films = JSON.parse(localStorage.getItem("films")) || [];
const table = document.getElementById("filmsTable");

function renderFilms(){
  table.innerHTML="";
  films.forEach((f,i)=>{
    table.innerHTML+=`
      <tr>
        <td>${f.titre}</td>
        <td>${f.genre}</td>
        <td>${f.annee}</td>
        <td>${f.note}</td>
        <td><button onclick="deleteFilm(${i})">❌</button></td>
      </tr>`;
  });
  localStorage.setItem("films", JSON.stringify(films));
}

function deleteFilm(i){
  if(confirm("Supprimer ce film ?")){
    films.splice(i,1);
    renderFilms();
    
    updateDashboard();
  }
}

document.getElementById("filmForm").onsubmit=e=>{
  e.preventDefault();
  films.push({
    titre:titre.value,
    genre:genre.value,
    annee:annee.value,
    note:note.value
  });
  renderFilms();
  updateDashboard();
  e.target.reset();
};

renderFilms();
