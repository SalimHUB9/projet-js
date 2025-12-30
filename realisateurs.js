let reals = JSON.parse(localStorage.getItem("reals")) || [];
const list = document.getElementById("realList");
let editRealIndex = null;

function renderReals() {
  list.innerHTML = "";

  reals.forEach((r, i) => {
    list.innerHTML += `
      <li>
        ${r.nom} (${r.nation})
        <button onclick="editReal(${i})">✏️</button>
        <button onclick="deleteReal(${i})">❌</button>
      </li>
    `;
  });

  localStorage.setItem("reals", JSON.stringify(reals));
  updateDashboard();
}

function deleteReal(i) {
  if (confirm("Supprimer ce réalisateur ?")) {
    reals.splice(i, 1);
    renderReals();
  }
}

function editReal(i) {
  nomReal.value = reals[i].nom;
  nationReal.value = reals[i].nation;
  editRealIndex = i;
  document.querySelector("#realForm button").innerText = "Modifier Réalisateur";
}

document.getElementById("realForm").onsubmit = e => {
  e.preventDefault();

  const real = {
    nom: nomReal.value,
    nation: nationReal.value
  };

  if (editRealIndex === null) {
    reals.push(real);
  } else {
    reals[editRealIndex] = real;
    editRealIndex = null;
    document.querySelector("#realForm button").innerText = "Ajouter Réalisateur";
  }

  renderReals();
  e.target.reset();
};

renderReals();
