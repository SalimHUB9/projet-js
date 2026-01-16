

const list = document.getElementById("realList");
let reals = JSON.parse(localStorage.getItem("reals")) || [];
let editRealIndex = null;


function renderReals() {
  reals = JSON.parse(localStorage.getItem("reals")) || [];

  list.innerHTML = "";

  if (reals.length === 0) {
    list.innerHTML = `<li style="opacity:.6">Aucun réalisateur</li>`;
    updateDashboard();
    return;
  }

  reals.forEach((r, i) => {
    list.innerHTML += `
      <li>
        🎬 ${r.nom}
        <span style="opacity:.6">(${r.nation})</span>
        <div>
          <button onclick="editReal(${i})">✏️</button>
          <button onclick="deleteReal(${i})">❌</button>
        </div>
      </li>
    `;
  });

  updateDashboard();
}


document.getElementById("realForm").onsubmit = e => {
  e.preventDefault();

  const nom = nomReal.value.trim();
  const nation = nationReal.value.trim();

  if (!nom) return;

  const exists = reals.some(
    r => r.nom.toLowerCase() === nom.toLowerCase()
  );

  if (exists && editRealIndex === null) {
    alert("Ce réalisateur existe déjà !");
    return;
  }

  const real = {
    nom,
    nation: nation || "Manuel"
  };

  if (editRealIndex === null) {
    reals.push(real);
  } else {
    reals[editRealIndex] = real;
    editRealIndex = null;
    document.querySelector("#realForm button").innerText =
      "Ajouter Réalisateur";
  }

  localStorage.setItem("reals", JSON.stringify(reals));
  renderReals();
  e.target.reset();
};


function deleteReal(i) {
  if (confirm("Supprimer ce réalisateur ?")) {
    reals.splice(i, 1);
    localStorage.setItem("reals", JSON.stringify(reals));
    renderReals();
  }
}


function editReal(i) {
  nomReal.value = reals[i].nom;
  nationReal.value = reals[i].nation;
  editRealIndex = i;
  document.querySelector("#realForm button").innerText =
    "Modifier Réalisateur";
}


renderReals();
