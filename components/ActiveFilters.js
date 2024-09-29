import { URL_PARAMS, getFiltersFromURLSearchParams } from "../utils/getFiltersFromURLSearchParams.js";

// Fonction pour retirer un filtre actif et mettre à jour l'URL
window.removeActiveFilter = (key, value) => {
  const currentParams = getFiltersFromURLSearchParams();
  const updatedFilters = currentParams[key].filter((item) => item !== value.trim());

  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(key, updatedFilters.join(","));

  if (!updatedFilters.length) {
    searchParams.delete(key);
  }

  const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${searchParams.toString()}`;
  window.location.assign(newUrl);
};

// Génère les filtres actifs affichés
const ActiveFilters = () => {
  const currentFilters = getFiltersFromURLSearchParams();

  const createFilterTag = (key, value) => `
    <div class="active-filter">
      <span>${value}</span>
      <button onClick="removeActiveFilter('${key}', '${value}')">×</button>
    </div>
  `;

  return Object.entries(currentFilters)
    .flatMap(([key, values]) => {
      // S'assurer que values est un tableau, sinon convertir en tableau
      const arrayValues = Array.isArray(values) ? values : [values];
      return arrayValues
        .filter((value) => value.trim() !== "")
        .map((value) => createFilterTag(key, value));
    })
    .join("");
};

export default ActiveFilters;
