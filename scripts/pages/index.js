/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/extensions */

import { Recipe, DisplayRecipes, UpdateRecipes } from '../controllers/RecipesController.js';
import { createAllFilters } from '../utils/filters.js';
import { SearchRecipes, SearchFilters } from '../utils/search.js';
import { recipesArray, ingredientsObject, appliancesObject, ustensilesObject } from '../controllers/datasController.js';

const fullArray = [ingredientsObject, appliancesObject, ustensilesObject];
console.log('index.js chargé');

const mainInput = document.querySelector('#mainSearchInput');
const RecipeContainer = document.querySelector('#recipesCardsContainer');



/**
 * Fonction d'initialisation de l'application.
 */
function init() {
  console.log('init chargé');
    
  DisplayRecipes(recipesArray);
  createAllFilters(fullArray); // Crée les filtres de recherche.

  mainInput.addEventListener('keyup', () => {
    if (mainInput.value.length > 2) {
      const updatedRecipes = SearchRecipes(mainInput.value);
      const UpdatedElement = SearchFilters(updatedRecipes)
      console.log('updatedElement', UpdatedElement);
      if (updatedRecipes.length > 0) {
        UpdateRecipes(updatedRecipes);
        console.log('updatedRecipes', updatedRecipes);
        console.log('Mis à jour des recettes', updatedRecipes)
        createAllFilters(UpdatedElement);
        console.log('Création des filtres', UpdatedElement);
      } else {
          
          RecipeContainer.innerHTML = `<div class="errorMsg">Aucune recette ne correspond à '${mainInput.value}'… vous pouvez chercher « 
                                      tarte aux pommes », « poisson », etc.</div>`;
        
      }
    } else {
      UpdateRecipes(recipesArray);
      createAllFilters(fullArray);
    }
  })
}

init(); // Appel de la fonction d'initialisation
