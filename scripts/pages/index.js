/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/extensions */

import { Recipe, DisplayRecipes, UpdateRecipes } from '../controllers/RecipesController.js';
import { createAllFilters } from '../utils/Filters.js';
import { Search } from '../utils/search.js';
import { recipesArray, ingredientsObject, appliancesObject, ustensilesObject } from '../controllers/datasController.js';

console.log('index.js loaded');

const recipeContainer = document.getElementById('recipesCardsContainer'); // Récupère l'élément HTML qui contiendra les cartes de recettes.
const mainInput = document.querySelector('#mainSearchInput');
const AllInput = document.querySelectorAll('input');
const fullArray = [ingredientsObject, appliancesObject, ustensilesObject];

/**
 * Fonction pour afficher le nombre de recettes
 */
function summarize() {
  const NumberOfCards = document.querySelectorAll('.recipeCard');
  const resume = document.getElementById('summer'); // Affiche le nombre de recettes.
  const { length } = NumberOfCards; // Récupère la longueur du tableau recipesArray.
  resume.innerHTML = `${length} `; // Affiche la longueur du tableau recipesArray.
}

/**
 * Fonction d'initialisation de l'application
 */
function init() {
  console.log('init loaded');

  // Initialise l'application
  
    DisplayRecipes(recipesArray);// Affiche les cartes de recettes.
    createAllFilters(fullArray); // Crée les filtres de recherche.
    summarize(); // Affiche le nombre de recettes.  
  

  mainInput.addEventListener('keyup', () => {
    const updateArray = recipesArray;
    
    
    if (mainInput.value.lenght<3) {
      DisplayRecipes(recipesArray);// Affiche les cartes de recettes.
      createAllFilters(fullArray); // Crée les filtres de recherche.
      summarize(); // Affiche le nombre de recettes.  
    } else if (mainInput.value.length >= 3 && updateArray.length != 0) {
      const input = [mainInput.value.toLowerCase()];// Récupère la valeur de l'input et la met en minuscule.
      const Array = Search(input)[0];// Récupère le tableau de recettes mis à jour.
      const Filters = Search(input)[1];// Récupère le tableau de filtres mis à jour.
      UpdateRecipes(Array);
      createAllFilters(Filters); // Crée les filtres de recherche mis  à jour.
      summarize(); // Affiche le nombre de recettes.
    }  else  if (mainInput.value.length >= 3 && updateArray.length == 0){
      recipeContainer.innerHTML = '<div class="noResult">Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc. </div>';
    }
    
  });
  summarize(); // Affiche le nombre de recettes.
}


init(); // Appel de la fonction d'initialisation
