import getFiltersFromURLSearchParams, { URL_PARAMS } from "./getFiltersFromURLSearchParams.js";

const toCleanValue = (value) => value.trim().toLowerCase();

// Filtrage des recettes en mode fonctionnel
const filterRecipesFunctional = (recipes) => {
  const params = getFiltersFromURLSearchParams();

  // Filtre par recherche textuelle
  const filterBySearch = (recipe) =>
    !params[URL_PARAMS.SEARCH] ||
    [recipe.name, recipe.description]
      .map(toCleanValue)
      .some((text) => text.includes(toCleanValue(params[URL_PARAMS.SEARCH]))) ||
    recipe.ingredients
      .map((ingredient) => toCleanValue(ingredient.ingredient))
      .some((ingredient) => ingredient.includes(toCleanValue(params[URL_PARAMS.SEARCH])));

  // Filtre par appareils
  const filterByTools = (recipe) =>
    params[URL_PARAMS.TOOLS].length === 0 ||
    params[URL_PARAMS.TOOLS]
      .map(toCleanValue)
      .includes(toCleanValue(recipe.appliance));

  // Filtre par ingrédients
  const filterByIngredients = (recipe) =>
    params[URL_PARAMS.INGREDIENTS].length === 0 ||
    params[URL_PARAMS.INGREDIENTS]
      .map(toCleanValue)
      .some((ingredient) =>
        recipe.ingredients.map((ing) => toCleanValue(ing.ingredient)).includes(ingredient)
      );

  // Filtre par ustensiles
  const filterByUstensils = (recipe) =>
    params[URL_PARAMS.USTENSIL].length === 0 ||
    params[URL_PARAMS.USTENSIL]
      .map(toCleanValue)
      .some((ustensil) => recipe.ustensils.map(toCleanValue).includes(ustensil));

  // Appliquer tous les filtres fonctionnellement
  return recipes.filter(
    (recipe) =>
      filterBySearch(recipe) &&
      filterByTools(recipe) &&
      filterByIngredients(recipe) &&
      filterByUstensils(recipe)
  );
};

export default filterRecipesFunctional;
