/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */

// Importation des modules depuis d'autres fichiers
import { recipesArray } from '../controllers/datasController.js';
import { getNormalized } from '../controllers/RecipesController.js';

console.log('search.js loaded');

/**
 * Fonction de recherche des recettes qui correspondent au mot clé donné.
 * @param {string} keyword - Le mot clé de recherche.
 * @returns {Array} - Un tableau contenant les recettes qui correspondent au mot clé.
 */
function SearchRecipes(keyword) {
  const updatedArray = [];

  recipesArray.forEach(recipe => {
    const { description, ingredients, name } = recipe;
    const ElementsToCheck = [name, description];

    for (let i = 0; i <= ingredients.lenght; i += 1) { // Il y a une faute de frappe ici, c'est "length" et non "lenght".
      const { ingredient } = ingredients[i];
      console.log('ingredient-ELEMENTTOCHECK', ingredient);
      ElementsToCheck.push(ingredient);
    }
    ElementsToCheck.forEach(element => {
      const normalizedElement = getNormalized(element);
      const normalizedKeyword = getNormalized(keyword);
      if (normalizedElement.match(normalizedKeyword) && !updatedArray.includes(recipe)) {
        updatedArray.push(recipe); // Ajoute la recette au tableau si elle correspond au mot clé et n'est pas déjà incluse.
      }
    });
  });

  return updatedArray;
}

/**
 * Fonction qui filtre les éléments de la liste des filtres en fonction de l'entrée utilisateur.
 * @param {string} input - L'entrée utilisateur (mot clé de recherche).
 * @param {NodeList} filterElements - La liste des éléments de filtre à filtrer.
 */
function SearchListInput(input, filterElements) {
  console.log('FilterElements', filterElements);

  filterElements.forEach((element) => {
    console.log(element.textContent);
    const normalizedElement = getNormalized(element.textContent);
    console.log('normalizedElement', normalizedElement);
    const normalizedInput = getNormalized(input);
    console.log('normalizedInput', normalizedInput);

    if (normalizedElement.includes(normalizedInput)) {
      // Affiche ou cache les éléments de filtre en fonction de la correspondance avec l'entrée utilisateur.
      element.classList.toggle('d-none', 'd-flex');
    }
  });
}

// Exportation des fonctions pour les rendre disponibles dans d'autres fichiers
export { SearchRecipes, SearchListInput };
