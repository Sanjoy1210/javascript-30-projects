(function (window) {
  const search = document.getElementById("search");
  const suggestions = document.querySelector(".suggestions");
  let cities = [];
  
  async function loadCities() {
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    const res = await fetch(endpoint);
    const data = await res.json();
    cities = data;
  }
  loadCities();

  function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function findMatches(searchText) {
    const result = cities.filter((place) => {
      const regEx = new RegExp(searchText, "gi");
      return place.city.match(regEx) || place.state.match(regEx);
    });
    return result;
  }


  function displayCities () {
    const places = findMatches(this.value);
    let html = `<li>No result found!</li>`;
    if (places?.length) {
      html = places.map((place) => {
        const regEx = new RegExp(this.value, "gi");
        const city = place.city.replace(regEx, `<span class="hl">${this.value}</span>`);
        const state = place.state.replace(regEx, `<span class="hl">${this.value}</span>`);
        return `
          <li>
            <span class="name">${city}, ${state}</span>
            <span class="population">${numberWithCommas(place.population)}</span>
          </li>
        `;
      }).join("");
    }

    suggestions.innerHTML = html;
  }

  search.addEventListener("keyup", displayCities);
}(window));
