import { URL_PARAMS, getFiltersFromURLSearchParams } from "../utils/getFiltersFromURLSearchParams.js";
import getInfoFromRecipes from "../utils/getInfoFromRecipes.js";
import RecipeCard from "../components/RecipeCard.js";
import ActiveFilters from "../components/ActiveFilters.js";

// Gère l'ajout ou suppression d'un élément de filtre
window.handleItemFilterClicked = (key, value) => {
  const currentParams = getFiltersFromURLSearchParams();
  const updatedSet = new Set(currentParams[key] || []);

  updatedSet.has(value.trim()) ? updatedSet.delete(value.trim()) : updatedSet.add(value.trim());

  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(key, Array.from(updatedSet).join(","));

  const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${searchParams.toString()}`;
  window.location.assign(newUrl);
};

// Permet d'afficher ou masquer les options de filtre
window.toggleFilterInput = (event) => {
  const arrow = event.currentTarget.querySelector(".filter__arrow");
  const filterInput = event.currentTarget.nextElementSibling;
  arrow.classList.toggle("rotated");
  filterInput.classList.toggle("visible");
};

// Permet de filtrer dynamiquement la liste d'éléments
window.filterList = (event) => {
  const filter = event.target.value.toLowerCase();
  const items = event.target.nextElementSibling.querySelectorAll(".filter__option");

  items.forEach((item) => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(filter) ? "" : "none";
  });
};

// Crée un composant de filtre fonctionnel
const Filter = (name, items, options = {}) => {
  const currentFilters = getFiltersFromURLSearchParams();
  const selectedItems = new Set(currentFilters[options.key] || []);

  return `
    <div class="filter">
      <div class="filter-choice">
        <label onClick="toggleFilterInput(event)">
          ${name}
          <div class="filter__arrow"></div>
        </label>
        <div class="wrapper__filter--input">
            <input type="text" class="filter__input" placeholder="Search..." oninput="filterList(event)" />
            <div class="filter__list-items">
            ${items
              .map(
                (item) => `<span class="filter__option${selectedItems.has(item) ? ' selected' : ''}" onClick="handleItemFilterClicked('${options.key}', '${item}')">${item}</span>`
              )
              .join("")}
            </div>
        </div>
      </div>
    </div>
  `;
};

// Construit le composant principal de filtres
const Filters = (recipes) => {
  const infos = getInfoFromRecipes(recipes);

  return `
      <div class="filters-wrapper">
        <div class="filters">
            ${Filter("Ingrédients", infos[URL_PARAMS.INGREDIENTS], { key: URL_PARAMS.INGREDIENTS })}
            ${Filter("Appareils", infos[URL_PARAMS.TOOLS], { key: URL_PARAMS.TOOLS })}
            ${Filter("Ustensiles", infos[URL_PARAMS.USTENSIL], { key: URL_PARAMS.USTENSIL })}
        </div>
        <div id="recipes-count" class="filters__count">${recipes.length} recettes</div>
      </div>
  `;
};

export { Filters };
export default Filters;
