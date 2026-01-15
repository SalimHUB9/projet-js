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
      apiTable.innerHTML = `<tr><td colspan="4">Veuillez saisir un titre</td></tr>`;
      return;
    }

    apiTable.innerHTML = `<tr><td colspan="4">Recherche en cours...</td></tr>`;

    fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(q)}&apikey=${API_KEY}`)
      .then(r => r.json())
      .then(d => {
        apiTable.innerHTML = "";

        if (d.Response === "False") {
          apiTable.innerHTML = `<tr><td colspan="4">Aucun résultat trouvé</td></tr>`;
          return;
        }

        d.Search.forEach(m => {
          apiTable.innerHTML += `
            <tr>
              <td>${m.Title}</td>
              <td>${m.Year}</td>
              <td>${m.Type}</td>
              <td>
                <button onclick="addFromAPI('${m.imdbID}')">➕</button>
              </td>
            </tr>
          `;
        });
      })
      .catch(() => {
        apiTable.innerHTML = `<tr><td colspan="4">Erreur API</td></tr>`;
      });
  }
}



function addFromAPI(imdbID) {

  fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`)
    .then(r => r.json())
    .then(movie => {

      const film = {
        titre: movie.Title,
        genre: movie.Genre ? movie.Genre.split(",")[0] : "Unknown",
        annee: movie.Year,
        note: movie.imdbRating !== "N/A" ? Number(movie.imdbRating) : 5
      };

      films.push(film);
      localStorage.setItem("films", JSON.stringify(films));
      renderFilms();

      alert("Film ajouté au Dashboard ✅");
    });
}
