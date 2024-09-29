import { URL_PARAMS } from "./getFiltersFromURLSearchParams.js";

// Extraire les ingrédients sans doublon
const extractIngredientsFromRecipes = (recipes) =>
  recipes.reduce((acc, recipe) => {
    recipe.ingredients.forEach(({ ingredient }) => {
      const cleanedIngredient = ingredient.trim().toLowerCase();
      if (!acc.includes(cleanedIngredient)) acc.push(cleanedIngredient);
    });
    return acc;
  }, []);

// Extraire les appareils sans doublon
const extractToolsFromRecipes = (recipes) =>
  recipes.reduce((acc, { appliance }) => {
    const cleanedAppliance = appliance.trim().toLowerCase();
    if (!acc.includes(cleanedAppliance)) acc.push(cleanedAppliance);
    return acc;
  }, []);

// Extraire les ustensiles sans doublon
const extractUstensilsFromRecipes = (recipes) =>
  recipes.reduce((acc, recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      const cleanedUstensil = ustensil.trim().toLowerCase();
      if (!acc.includes(cleanedUstensil)) acc.push(cleanedUstensil);
    });
    return acc;
  }, []);

// Récupérer toutes les informations de filtrage
export const getInfoFromRecipes = (recipes) => ({
  [URL_PARAMS.INGREDIENTS]: extractIngredientsFromRecipes(recipes),
  [URL_PARAMS.TOOLS]: extractToolsFromRecipes(recipes),
  [URL_PARAMS.USTENSIL]: extractUstensilsFromRecipes(recipes),
});

export default getInfoFromRecipes;
