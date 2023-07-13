/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/extensions */

import {  DisplayRecipes, UpdateRecipes } from '../controllers/RecipesController.js';
import { GetAllFilters,  UpdateFilters } from '../utils/filters.js';
import { SearchListInput, SearchRecipes } from '../utils/search.js';
import { recipesArray, ingredientsObject, appliancesObject, ustensilesObject } from '../controllers/datasController.js';

const fullArray = [ingredientsObject, appliancesObject, ustensilesObject];
console.log('index.js chargé');

const mainInput = document.querySelector('#mainSearchInput');
const recipeContainer = document.querySelector('#recipesCardsContainer');
const filterIngredientsInputs = document.querySelector('#ingredientsSearchInput');
const filtersIngredientsElements = filterIngredientsInputs.querySelectorAll('.filterOptions');
const appliancesSearchInput = document.querySelector('#appliancesSearchInput');
const filtersAppliancesElements = appliancesSearchInput.querySelectorAll('.filterOptions');
const ustensilsSearchInput = document.querySelector('#ustensilsSearchInput');
const filtersUstensilsElements = ustensilsSearchInput.querySelectorAll('.filterOptions');
const filtersInput = document.querySelectorAll('.filterInput');
const labelsContainer = document.querySelector('#labelsContainer');
/**
 * Fonction d'initialisation de l'application.
 */
function init() {
  DisplayRecipes(recipesArray);
  GetAllFilters(fullArray); // Crée les filtres de recherche.


  mainInput.addEventListener('keyup', () => {
    const updatedArray = SearchRecipes(mainInput.value.toLowerCase());
    const UpdatedElement = UpdateFilters(updatedArray);
    if (mainInput.value.length > 2) {

      console.log('mainInput.value', mainInput.value);
      console.log('mainInput.value', updatedArray);
      console.log('mainInput.value', UpdatedElement);

      UpdateRecipes(updatedArray);
      GetAllFilters(UpdatedElement);
      if (updatedArray.length === 0) {
        recipeContainer.innerHTML = `<p class=errorMsg>Aucune recette ne correspond à "${mainInput.value}" vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`;
      }
    } else {
      UpdateRecipes(recipesArray);
      GetAllFilters(fullArray);
    }
  })

  filtersInput.forEach((input) => {
    input.addEventListener('keyup', () => {
      const inputFilterName = input.id.replace('SearchInput', '');
      const InputValue = input.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      const list = document.getElementById(`${inputFilterName}List`);
      const FilterElementsOptions = Array.from(list.children);
      SearchListInput(InputValue, FilterElementsOptions);
     
    })
  })


}
init(); // Appel de la fonction d'initialisation