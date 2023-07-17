/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/extensions */

import { Recipe, DisplayRecipes, UpdateRecipes, getNormalized } from '../controllers/RecipesController.js';
import { GetAllFilters, GetFilters, UpdateFilters } from '../utils/Filters.js';
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
    const list = document.getElementById(input.parentElement.parentElement.id);
    const filtersArray = Array.from(list.getElementsByClassName('filterOption'))
    console.log('normalizedName', filtersArray);
    filtersArray.forEach((filter) => {
      console.log('normalizedName', filter);
      const normalizedName = getNormalized(filter.innerText);
      console.log('normalizedName', normalizedName);
      if (normalizedName.includes(getNormalized(input.value))) {
        filter.classList.remove('hidden');

      } else {
          filter.classList.add('hidden');      }
    })
  


  // console.log('input', (Array.from(input.parentElement.parentElement.children)))
   SearchListInput(input.value, filtersArray);
})})
}


init(); // Appel de la fonction d'initialisation 