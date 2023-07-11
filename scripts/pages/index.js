/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import { Recipe, DisplayRecipes, UpdateRecipes } from '../controllers/RecipesController.js';
import { createAllFilters } from '../utils/filters.js';
import { Search } from '../utils/search.js';
import { recipesArray, ingredientsObject, appliancesObject, ustensilesObject } from '../controllers/datasController.js';

const fullArray = [ingredientsObject, appliancesObject, ustensilesObject];
console.log('index.js loaded');

const mainInput = document.querySelector('#mainSearchInput')

function summarize() {
  const NumberOfCards = document.querySelectorAll('.recipeCard')
  const resume = document.getElementById('summer'); // Affiche le nombre de recettes.
  const { length } = NumberOfCards; // Récupère la longueur du tableau recipesArray.
  resume.innerHTML = `${length} `; // Affiche la longueur du tableau recipesArray.
}






function init() {
  console.log('init loaded')
  
  // Initialise l'application
  for (let i = 0; i < recipesArray.length ; i += 1) {
    // Parcourt le tableau recipesArray et crée une carte de recette pour chaque élément.
    const { appliance, description, id, image, ingredients, name, servings, time, ustensils } = recipesArray[i];
    const recipe = new Recipe(appliance, description, id, image, ingredients, name, servings, time, ustensils);
    DisplayRecipes(recipesArray)
    
  }
  createAllFilters(fullArray); // Crée les filtres de recherche.
  summarize(); // Affiche le nombre de recettes.

  mainInput.addEventListener('keyup', () => {
          
         if(mainInput.value.length >= 3) {
          console.log('mainInput.value', mainInput.value)
          console.log('mainInput.value', Search(mainInput.value)[0] )
          console.log('mainInput.value', Search(mainInput.value)[1] )

          const [ updatedArray, updatedFilter ] = Search(mainInput.value)
          UpdateRecipes( updatedArray)
          console.log('updatedFilter',  updatedFilter)
          createAllFilters(updatedFilter)

          
         } else {
            UpdateRecipes(recipesArray)
            createAllFilters(fullArray)
          }
    })


}

init(); // Appel de la fonction d'initialisation
