/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/extensions */

// Importation des modules depuis d'autres fichiers
import { Recipe, DisplayRecipes, UpdateRecipes, getNormalized } from '../controllers/RecipesController.js';
import { GetAllFilters, GetFilters, UpdateFilters } from '../utils/Filters.js';
import { SearchListInput, SearchRecipes } from '../utils/search.js';
import { recipesArray, ingredientsObject, appliancesObject, ustensilesObject } from '../controllers/datasController.js';

console.log('index.js chargé');

// Tableau contenant les objets d'ingrédients, d'appareils et d'ustensiles
const fullArray = [ingredientsObject, appliancesObject, ustensilesObject];

// Sélection des éléments HTML du DOM
const mainInput = document.querySelector('#mainSearchInput');
const recipeContainer = document.querySelector('#recipesCardsContainer');
const filterIngredientsInputs = document.querySelector('#ingredientsSearchInput');
const filtersIngredientsElements = filterIngredientsInputs.querySelectorAll('.filterOptions');
const appliancesSearchInput = document.querySelector('#appliancesSearchInput');
const filtersAppliancesElements = appliancesSearchInput.querySelectorAll('.filterOptions');
const ustensilsSearchInput = document.querySelector('#ustensilsSearchInput');
const filtersUstensilsElements = ustensilsSearchInput.querySelectorAll('.filterOptions');
const filtersInput = document.querySelectorAll('.filterInput');
const labelsContainer = document.querySelector('#labelsContainer');

/**
 * Fonction d'initialisation de l'application.
 */
function init() {
  DisplayRecipes(recipesArray); // Affiche toutes les recettes au chargement de la page
  GetAllFilters(fullArray); // Crée les filtres de recherche.

  mainInput.addEventListener('keyup', () => {
    // Récupère les recettes qui correspondent à la recherche.
    const updatedArray = SearchRecipes(mainInput.value);
    // Récupère les filtres qui correspondent à la recherche.
    const UpdatedElement = UpdateFilters(updatedArray);

    if (mainInput.value.length > 2) {
      // Si la valeur de l'input est supérieure à 2 caractères, affiche les recettes qui correspondent.
      console.log('mainInput.value', mainInput.value);
      console.log('mainInput.value', updatedArray);
      console.log('mainInput.value', UpdatedElement);

      UpdateRecipes(updatedArray); // Met à jour les recettes.
      GetAllFilters(UpdatedElement); // Crée les filtres de recherche.

      if (updatedArray.length === 0) {
        // Si aucune recette ne correspond, affiche un message d'erreur.
        recipeContainer.innerHTML = `<p class='errorMsg mx-auto my-0'>Aucune recettes ne correspond à "${mainInput.value}" vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`;
      }
    } else {
      // Si la valeur de l'input est inférieure à 3 caractères, affiche toutes les recettes.
      UpdateRecipes(recipesArray);
      GetAllFilters(fullArray);
    }
  });

  filtersInput.forEach((input) => {
    input.addEventListener('keyup', () => {
      // Recherche les filtres qui correspondent à la recherche.
      const list = document.getElementById(input.parentElement.parentElement.id);
      const filtersArray = Array.from(list.getElementsByClassName('filterOption'));
      console.log('normalizedName', filtersArray);

      filtersArray.forEach((filter) => {
        console.log('normalizedName', filter);
        const normalizedName = getNormalized(filter.textContent);
        console.log('normalizedName', normalizedName);

        if (normalizedName.includes(getNormalized(input.value))) {
          // Affiche le filtre s'il correspond à la recherche.
          filter.classList.remove('hidden');
        } else {
          // Cache le filtre s'il ne correspond pas à la recherche.
          filter.classList.add('hidden');
        }
      });

      SearchListInput(input.value, filtersArray);
    });
  });

  filtersInput.forEach((input) => {
    // Ajoute un écouteur d'évènement sur chaque input de filtre
    input.addEventListener('keyup', () => {
      const list = document.getElementById(input.parentElement.parentElement.id);
      const filtersArray = Array.from(list.getElementsByClassName('filterOption'));
      console.log('normalizedName', filtersArray);

      filtersArray.forEach((filter) => {
        console.log('normalizedName', filter);
        const normalizedName = getNormalized(filter.innerText);
        console.log('normalizedName', normalizedName);

        if (normalizedName.includes(getNormalized(input.value))) {
          // Affiche le filtre s'il correspond à la recherche.
          filter.classList.remove('hidden');
        } else {
          // Cache le filtre s'il ne correspond pas à la recherche.
          filter.classList.add('hidden');
        }
      });

      SearchListInput(input.value, filtersArray);
    });
  });
}

init(); // Appel de la fonction d'initialisation
