let films = JSON.parse(localStorage.getItem("films")) || [];
const table = document.getElementById("filmsTable");
let editIndex = null;

const searchInput = document.getElementById("searchFilm");
const sortSelect = document.getElementById("sortFilm");

function renderFilms(list = films) {
  table.innerHTML = "";

  list.forEach((f, i) => {
    table.innerHTML += `
      <tr>
        <td>${f.titre}</td>
        <td>${f.genre}</td>
        <td>${f.annee}</td>
        <td>${Number(f.note).toLocaleString("fr-FR")}</td>
        <td>
          <button onclick="editFilm(${i})">✏️</button>
          <button onclick="deleteFilm(${i})">❌</button>
        </td>
      </tr>
    `;
  });

  localStorage.setItem("films", JSON.stringify(films));
  updateDashboard();
}

/* ===== Recherche ===== */
searchInput.oninput = () => {
  const q = searchInput.value.toLowerCase();

  const filtered = films.filter(f =>
    f.titre.toLowerCase().includes(q) ||
    f.genre.toLowerCase().includes(q) ||
    f.annee.toString().includes(q)
  );

  renderFilms(filtered);
};

/* ===== Tri ===== */
sortSelect.onchange = () => {
  const value = sortSelect.value;
  let sorted = [...films];

  if (value === "titre") {
    sorted.sort((a, b) => a.titre.localeCompare(b.titre));
  }
  if (value === "note") {
    sorted.sort((a, b) => b.note - a.note);
  }
  if (value === "annee") {
    sorted.sort((a, b) => b.annee - a.annee);
  }

  renderFilms(sorted);
};

/* ===== CRUD ===== */

function deleteFilm(i) {
  if (confirm("Supprimer ce film ?")) {
    films.splice(i, 1);
    renderFilms();
  }
}

function editFilm(i) {
  const f = films[i];
  titre.value = f.titre;
  genre.value = f.genre;
  annee.value = f.annee;
  note.value = f.note;
  editIndex = i;
  document.querySelector("#filmForm button").innerText = "Modifier Film";
}

document.getElementById("filmForm").onsubmit = e => {
  e.preventDefault();

  const film = {
    titre: titre.value,
    genre: genre.value,
    annee: annee.value,
    note: Number(note.value)
  };

  if (editIndex === null) {
    films.push(film);
  } else {
    films[editIndex] = film;
    editIndex = null;
    document.querySelector("#filmForm button").innerText = "Ajouter Film";
  }

  renderFilms();
  e.target.reset();
};

renderFilms();
