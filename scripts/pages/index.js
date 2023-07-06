/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import { Recipe, DisplayRecipes, UpdateRecipes } from '../controllers/RecipesController.js';
import { createAllFilters } from '../utils/Filters.js';
import { Search } from '../utils/search.js';
import { recipesArray, ingredientsObject, appliancesObject, ustensilesObject } from '../controllers/datasController.js';

const fullArray = [ingredientsObject, appliancesObject, ustensilesObject];
console.log('fullArray', fullArray)
console.log('index.js loaded');

const recipeContainer = document.getElementById('recipesCardsContainer'); // Récupère l'élément HTML qui contiendra les cartes de recettes.
const mainInput = document.querySelector('#mainSearchInput')
const AllInput = document.querySelectorAll('input')

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
          const updatedArray = Search(mainInput.value)[0]
          const updatedFilter = Search(mainInput.value)[1]
          UpdateRecipes( updatedArray)
          console.log('updatedFilter', updatedFilter)
          createAllFilters(updatedFilter)
          
         } else {
            UpdateRecipes(recipesArray)
            createAllFilters(fullArray)
          }
    })


}

init(); // Appel de la fonction d'initialisation
