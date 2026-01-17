let films = JSON.parse(localStorage.getItem("films")) || [];
films = films.map(f => ({
  ...f,
  realisateur: f.realisateur || "Non défini"
}));

localStorage.setItem("films", JSON.stringify(films));

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
        <td>${f.realisateur ?? "Non défini"}</td>

        <!-- ✅ ACTIONS -->
        <td class="actions">
          <button onclick="showDetails(${i})">👁️</button>
          <button onclick="editFilm(${i})">✏️</button>
          <button onclick="deleteFilm(${i})">❌</button>
        </td>
      </tr>
    `;
  });

  localStorage.setItem("films", JSON.stringify(films));
  updateDashboard();
}


searchInput.oninput = () => {
  const q = searchInput.value.toLowerCase();
  renderFilms(
    films.filter(f =>
      f.titre.toLowerCase().includes(q) ||
      f.genre.toLowerCase().includes(q) ||
      f.annee.toString().includes(q)
    )
  );
};

sortSelect.onchange = () => {
  let sorted = [...films];
  if (sortSelect.value === "titre") sorted.sort((a, b) => a.titre.localeCompare(b.titre));
  if (sortSelect.value === "note") sorted.sort((a, b) => b.note - a.note);
  if (sortSelect.value === "annee") sorted.sort((a, b) => b.annee - a.annee);
  renderFilms(sorted);
};

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

  
  document.getElementById("filmForm").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  
  titre.focus();
}


document.getElementById("filmForm").onsubmit = e => {
  e.preventDefault();

  const realsLS = JSON.parse(localStorage.getItem("reals")) || [];

  let realisateurFinal = "Non défini";

  if (editIndex !== null && films[editIndex].realisateur) {
    
    realisateurFinal = films[editIndex].realisateur;
  } else if (realsLS.length > 0) {
    
    realisateurFinal = realsLS[0].nom;
  }

  const film = {
    titre: titre.value,
    genre: genre.value,
    annee: annee.value,
    note: Number(note.value),
    realisateur: realisateurFinal
  };

  if (editIndex === null) {
    films.push(film);
  } else {
    films[editIndex] = film;
    editIndex = null;
    document.querySelector("#filmForm button").innerText = "Ajouter Film";
  }

  localStorage.setItem("films", JSON.stringify(films));
  renderFilms();
  e.target.reset();
};



function showDetails(i) {
  const f = films[i];

  document.getElementById("dTitre").innerText = f.titre;
  document.getElementById("dGenre").innerText = f.genre;
  document.getElementById("dAnnee").innerText = f.annee;
  document.getElementById("dNote").innerText = `${f.note}/10`;
  document.getElementById("dRealisateur").innerText =
    f.realisateur ?? "Non défini";

  document.getElementById("detailsModal").style.display = "flex";
}

function closeDetails() {
  document.getElementById("detailsModal").style.display = "none";
}


window.onclick = e => {
  const modal = document.getElementById("detailsModal");
  if (e.target === modal) {
    closeDetails();
  }
};




renderFilms();
