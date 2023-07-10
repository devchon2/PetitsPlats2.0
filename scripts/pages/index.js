/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/extensions */

import { Recipe, DisplayRecipes, UpdateRecipes } from '../controllers/RecipesController.js';
import { recipesArray, ingredientsObject, appliancesObject, ustensilesObject } from '../controllers/datasController.js';

console.log('index.js loaded');

const recipeContainer = document.getElementById('recipesCardsContainer'); // Récupère l'élément HTML qui contiendra les cartes de recettes.
const mainInput = document.querySelector('#mainSearchInput');
const AllInput = document.querySelectorAll('input');
const fullArray = [ingredientsObject, appliancesObject, ustensilesObject];



/**
 * Fonction d'initialisation de l'application
 */
function init() {
  console.log('init loaded');

  // Initialise l'application
  
    DisplayRecipes(recipesArray);// Affiche les cartes de recettes.
  

  mainInput.addEventListener('keyup', () => {
    const updateArray = recipesArray;
    
    
    if (mainInput.value.lenght<3) {
      DisplayRecipes(recipesArray);// Affiche les cartes de recettes.
   
    } else if (mainInput.value.length >= 3 && updateArray.length != 0) {
      const input = [mainInput.value.toLowerCase()];// Récupère la valeur de l'input et la met en minuscule.
      const Array = Search(input)[0];// Récupère le tableau de recettes mis à jour.
      // const Filters = Search(input)[1];// Récupère le tableau de filtres mis à jour.
      UpdateRecipes(updateArray);// Met à jour les cartes de recettes.
      // createAllFilters(Filters); // Crée les filtres de recherche mis  à jour.
    }  else  if (mainInput.value.length >= 3 && updateArray.length == 0){
      recipeContainer.innerHTML = '<div class="noResult">Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc. </div>';
    }
    
  });
}


init(); // Appel de la fonction d'initialisation
