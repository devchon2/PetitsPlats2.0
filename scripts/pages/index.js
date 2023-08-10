/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/extensions */

// Importation des modules depuis d'autres fichiers
import { DisplayRecipes, UpdateRecipes } from '../controllers/RecipesController.js';
import { GetAllFilters, UpdateFilters } from '../utils/Filters.js';
import { SearchFromMain, SearchListInput } from '../utils/search.js';
import { recipesArray, ingredientsObject, appliancesObject, ustensilesObject } from '../controllers/datasController.js';

console.log('index.js chargé');

// Tableau contenant les objets d'ingrédients, d'appareils et d'ustensiles
const fullArray = [ingredientsObject, appliancesObject, ustensilesObject];

// Sélection des éléments HTML du DOM
const mainInput = document.querySelector('#mainSearchInput');
const recipeContainer = document.querySelector('#recipesCardsContainer');


/**
 * Fonction d'initialisation de l'application.
 */

function init() {
  DisplayRecipes(recipesArray); // Affiche toutes les recettes au chargement de la page
  GetAllFilters(fullArray); // Crée les filtres de recherche.

  mainInput.addEventListener('keyup', () => {    // Récupère les recettes qui correspondent à la recherche.
    const updatedFromMain = SearchFromMain(mainInput.value, recipesArray);    // Récupère les filtres qui correspondent à la recherche.

    if (mainInput.value.length > 2) {      // Si la valeur de l'input est supérieure à 2 caractères, affiche les recettes qui correspondent.
      if (updatedFromMain) {        // Si aucune recette ne correspond, affiche un message d'erreur.
        UpdateRecipes(updatedFromMain); // Met à jour les recettes.
        UpdateFilters(updatedFromMain); // Crée les filtres de recherche.
      } else {
        recipeContainer.innerHTML = `<p class='errorMsg mx-auto my-0'>
                                        Aucune recettes ne correspond à "${mainInput.value}" 
                                        vous pouvez chercher « tarte aux pommes », « poisson », 
                                        etc.</p>`;
      }
    } else {
      // Si la valeur de l'input est inférieure à 3 caractères, affiche toutes les recettes.
      DisplayRecipes(recipesArray);
      GetAllFilters(fullArray);
    }
  });

  
}
init(); // Appel de la fonction d'initialisation
