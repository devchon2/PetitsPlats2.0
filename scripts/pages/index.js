/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/extensions */

import { Recipe, DisplayRecipes, UpdateRecipes } from '../controllers/RecipesController.js';
import { recipesArray } from '../controllers/datasController.js';
import { createAllFilters } from '../utils/Filters.js';
import { Search } from '../utils/search.js';

console.log('index.js loaded');

const recipeContainer = document.getElementById('recipesCardsContainer'); // Récupère l'élément HTML qui contiendra les cartes de recettes.
const mainInput = document.querySelector('#mainSearchInput')
const AllInput = document.querySelectorAll('input')




/**
 * Fonction d'initialisation de l'application
 */
function init() {
  console.log('init loaded');

  // Initialise l'application
  for (let i = 0; i < recipesArray.length ; i += 1) {
    // Parcourt le tableau recipesArray et crée une carte de recette pour chaque élément.
    const { appliance, description, id, image, ingredients, name, servings, time, ustensils } = recipesArray[i];
    const recipe = new Recipe(appliance, description, id, image, ingredients, name, servings, time, ustensils);
    DisplayRecipes(recipesArray)
    
  }
  createAllFilters(); // Crée les filtres de recherche.
  const NumberOfCards = document.querySelectorAll('.recipeCard')
  const resume = document.getElementById('summer'); // Affiche le nombre de recettes.
  const { length } = NumberOfCards; // Récupère la longueur du tableau recipesArray.
  resume.innerHTML = `${length} `; // Affiche la longueur du tableau recipesArray.

  mainInput.addEventListener('keyup', () => {
          
         if(mainInput.value.length >= 3) {
          const updatedArray = Search(mainInput.value)
          UpdateRecipes( updatedArray)
         } else if (mainInput.value.length < 3){
            UpdateRecipes(recipesArray)
         }
    })


}


init(); // Appel de la fonction d'initialisation
