/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/extensions */

import { Recipe, DisplayRecipes, UpdateRecipes } from '../controllers/RecipesController.js';
import { createAllFilters, createFilter } from '../utils/Filters.js';
import { SearchRecipes, SearchFilters } from '../utils/search.js';
import { recipesArray, ingredientsObject, appliancesObject, ustensilesObject } from '../controllers/datasController.js';

const fullArray = [ingredientsObject, appliancesObject, ustensilesObject];
console.log('index.js chargé');

const mainInput = document.querySelector('#mainSearchInput');
const recipeContainer = document.querySelector('#recipesCardsContainer');
const filterIngredientsInputs = document.querySelector('#ingredientsSearchInput');
const filtersIngredientsElements = filterIngredientsInputs.querySelectorAll('.filterOptions');
const appliancesSearchInput = document.querySelector('#appliancesSearchInput');
const ustensilsSearchInput = document.querySelector('#ustensilsSearchInput');
const filtersInput = document.querySelectorAll('.filterInput');


/**
 * Fonction d'initialisation de l'application.
 */
function init() {
  DisplayRecipes(recipesArray);
  createAllFilters(fullArray); // Crée les filtres de recherche.

  mainInput.addEventListener('keyup', () => {
    const updatedArray = SearchRecipes(mainInput.value.toLowerCase());
    const UpdatedElement = SearchFilters(updatedArray);
    if (mainInput.value.length > 2) {
      console.log('mainInput.value', mainInput.value);
      console.log('mainInput.value', updatedArray);
      console.log('mainInput.value', UpdatedElement);

      UpdateRecipes(updatedArray);
      createAllFilters(UpdatedElement);
      if (updatedArray.length === 0) {
        recipeContainer.innerHTML = `<p class=errorMsg>Aucune recette ne correspond à "${mainInput.value}" vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`;
      }
    } else {
      UpdateRecipes(recipesArray);
      createAllFilters(fullArray);
    }
})

// filtersInput.forEach((filterInput) => {
//   if (filterInput.id === 'filterIngredientsInputs') {
//     ''
//   } else if (filterInput.id === 'appliancesSearchInput') {
//     ''
//   } else if (filterInput.id === 'ustensilsSearchInput') {
//     ''
//   }})
}
init(); // Appel de la fonction d'initialisation
