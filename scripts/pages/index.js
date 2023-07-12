/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/extensions */

import { Recipe, DisplayRecipes, UpdateRecipes } from '../controllers/RecipesController.js';
import { createAllFilters, createFilter } from '../utils/filters.js';
import { Search } from '../utils/search.js';
import { recipesArray, ingredientsObject, appliancesObject, ustensilesObject } from '../controllers/datasController.js';

const fullArray = [ingredientsObject, appliancesObject, ustensilesObject];
console.log('index.js chargé');

const mainInput = document.querySelector('#mainSearchInput');
const RecipeContainer = document.querySelector('#recipesCardsContainer');

/**
 * Fonction qui affiche le résumé du nombre de recettes.
 */
function summarize() {
  const NumberOfCards = document.querySelectorAll('.recipeCard');
  const resume = document.getElementById('summer'); // Affiche le nombre de recettes.
  const { length } = NumberOfCards; // Récupère la longueur du tableau recipesArray.
  resume.innerHTML = `${length} `; // Affiche la longueur du tableau recipesArray.
}

/**
 * Fonction d'initialisation de l'application.
 */
function init() {
  console.log('init chargé');

  // Initialise l'application
  recipesArray.forEach((Rec) => {
    // Parcourt le tableau recipesArray et crée une carte de recette pour chaque élément.
    const { appliance, description, id, image, ingredients, name, servings, time, ustensils } = Rec;
    const recipe = new Recipe(appliance, description, id, image, ingredients, name, servings, time, ustensils);
    DisplayRecipes(recipesArray);
  });

  createAllFilters(fullArray); // Crée les filtres de recherche.
  summarize(); // Affiche le nombre de recettes.

  mainInput.addEventListener('keyup', () => {
    if (mainInput.value.length > 2) {
      const updatedArray = Search(mainInput.value)[0];
      const UpdatedElement = Search(mainInput.value)[1];
      console.log('updatedElement', UpdatedElement);
      if (updatedArray.length > 0) {
        UpdateRecipes(updatedArray);
        createAllFilters(UpdatedElement);
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
