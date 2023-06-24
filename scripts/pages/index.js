/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import { Recipe } from '../controllers/RecipesController.js';
import {
  recipesArray,
  IngredientsObject,
  AppliancesObject,
  UstensilesObject,
} from '../controllers/datasController.js';
import { CreateAllFilters, CreateFilter } from '../utils/Filters.js';

console.log('index.js chargé');

const recipeContainer = document.getElementById('RecipesCardsContainer');

/**
 * Initialise l'application.
 */
function init() {
  // Parcourt le tableau recipesArray et crée une carte de recette pour chaque élément.
  for (let i = 0; i < recipesArray.length - 1; i += 1) {
    const recipe = new Recipe(
      recipesArray[i].appliance,
      recipesArray[i].description,
      recipesArray[i].id,
      recipesArray[i].image,
      recipesArray[i].ingredients,
      recipesArray[i].name,
      recipesArray[i].servings,
      recipesArray[i].time,
      recipesArray[i].ustensils
    );
    const recipeCard = recipe.getCard();
    recipeContainer.appendChild(recipeCard);
  }
  CreateAllFilters();

  const resume = document.getElementById('summer')
  const lenght = recipesArray.length
  resume.innerHTML = `${lenght} `
  
}

// Appel de la fonction d'initialisation
init();
