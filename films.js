let films = JSON.parse(localStorage.getItem("films")) || [];
let editIndex = null;

function saveFilms() {
  localStorage.setItem("films", JSON.stringify(films));
}

function renderFilms() {
  filmsTable.innerHTML = "";
  films.forEach((f, i) => {
    filmsTable.innerHTML += `
      <tr>
        <td>${f.titre}</td>
        <td>${f.genre}</td>
        <td>${f.annee}</td>
        <td>${f.note}</td>
        <td>${f.realisateur}</td>
        <td>
          <button onclick="editFilm(${i})">✏️</button>
          <button onclick="deleteFilm(${i})">❌</button>
        </td>
      </tr>`;
  });
}

function deleteFilm(i) {
  films.splice(i,1);
  saveFilms();
  renderFilms();
  updateDashboard();
}

function editFilm(i) {
  const f = films[i];
  titre.value = f.titre;
  genre.value = f.genre;
  annee.value = f.annee;
  note.value = f.note;
  realisateur.value = f.realisateur;
  editIndex = i;
}

filmForm.onsubmit = e => {
  e.preventDefault();

  const film = {
    titre: titre.value,
    genre: genre.value,
    annee: annee.value,
    note: Number(note.value),
    realisateur: realisateur.value,
    source: "MANUEL"
  };

  if (editIndex === null) films.push(film);
  else films[editIndex] = film;

  editIndex = null;
  saveFilms();
  renderFilms();
  updateDashboard();
  filmForm.reset();
};

document.addEventListener("DOMContentLoaded", renderFilms);
