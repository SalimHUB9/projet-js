const API_KEY = "91e28bba";

function initAPI() {

  const searchInput = document.getElementById("searchMovie");
  const searchBtn = document.getElementById("btnSearch");
  const apiTable = document.getElementById("apiTable");

  searchBtn.onclick = search;
  searchInput.onkeyup = e => {
    if (e.key === "Enter") search();
  };

  function search() {
    const q = searchInput.value.trim();

    if (!q) {
      apiTable.innerHTML = `<tr><td colspan="3">Veuillez saisir un titre</td></tr>`;
      return;
    }

    apiTable.innerHTML = `<tr><td colspan="3">Recherche en cours...</td></tr>`;

    fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(q)}&apikey=${API_KEY}`)
      .then(r => r.json())
      .then(d => {
        apiTable.innerHTML = "";

        if (d.Response === "False") {
          apiTable.innerHTML = `<tr><td colspan="3">Aucun résultat trouvé</td></tr>`;
          return;
        }

        d.Search.forEach(m => {
          apiTable.innerHTML += `
            <tr>
              <td>${m.Title}</td>
              <td>${m.Year}</td>
              <td>${m.Type}</td>
            </tr>
          `;
        });
      })
      .catch(() => {
        apiTable.innerHTML = `<tr><td colspan="3">Erreur API</td></tr>`;
      });
  }
}
