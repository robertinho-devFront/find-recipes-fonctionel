import { URL_PARAMS } from "../utils/getFiltersFromURLSearchParams.js";

// Gestion de la recherche soumise
window.handleSearchSubmitted = () => {
  const value = document.querySelector("#main-search").value.trim();
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(URL_PARAMS.SEARCH, value);

  const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${searchParams.toString()}`;
  window.location.assign(newUrl);
};

// Composant d'en-tête avec champ de recherche
export const Header = () => {
  return `
      <header class="header">
        <div class="header__content">
          <h1 class="title__logo">Les Petits Plats <img src="assets/img/logo.png"></h1>
          <h2 class="subtitle__page">CHERCHEZ PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES</h2>
          <form class="search-container">
            <input type="text" id="main-search" class="search-container__input" placeholder="Rechercher une recette, un ingrédient, ..." />
            <button type="button" id="search-button" class="search-container__button" onClick="handleSearchSubmitted();"><img class="search-container__img" src="assets/img/loupw.png"></button>
          </form>
        </div>
      </header>
  `;
};

export default Header;
