/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import { Recipe } from '../controllers/RecipesController.js';
import {  recipesArray } from '../controllers/datasController.js';
import { CreateAllFilters } from '../utils/Filters.js';
import {  } from '../utils/search.js'

console.log('index.js loaded');

const recipeContainer = document.getElementById('RecipesCardsContainer'); // Récupère l'élément HTML qui contiendra les cartes de recettes.

function init() {// Initialise l'application 

  for (let i = 0; i < recipesArray.length - 1; i += 1) {// Parcourt le tableau recipesArray et crée une carte de recette pour chaque élément.
    const { appliance, description, id, image, ingredients, name, servings, time, ustensils } = recipesArray[i];
    const recipe = new Recipe( appliance, description, id, image, ingredients, name, servings, time, ustensils );
    recipeContainer.appendChild(recipe.getCard());
  }

  CreateAllFilters(); // Crée les filtres de recherche.
  const resume = document.getElementById('summer'); // Affiche le nombre de recettes.
  const lenght = recipesArray.length; // Récupère la longueur du tableau recipesArray.
  resume.innerHTML = `${lenght} `; // Affiche la longueur du tableau recipesArray.
}

init();// Appel de la fonction d'initialisation

