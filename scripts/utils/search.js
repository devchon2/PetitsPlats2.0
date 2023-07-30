/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { recipesArray } from '../controllers/datasController.js';
import {
  getNormalized,
  UpdateRecipes,
} from '../controllers/RecipesController.js';

console.log('search.js loaded');

function SearchRecipes(keyword, type = 'main') {
  const updatedArray = [];
console.log(recipesArray.length)
  for (let i = 0; i < recipesArray.length; i += 1) {
    const recipe = recipesArray[i];
    const { description, ingredients, appliance, ustensils, name } = recipe;
    const ElementsToCheckMain = [name, description];
    const ElementsToCheckFilter = [appliance, ...ustensils];
    
    for (let j = 0; j <= ingredients.length-1 ; j += 1) {
      const ingr = ingredients[j];
      const { ingredient } = ingr;
      ElementsToCheckMain.push(ingredient);
      ElementsToCheckFilter.push(ingredient);
    }
    let ElementsToCheck = ElementsToCheckMain;

    if (type === 'filter') {
      ElementsToCheck = ElementsToCheckFilter;
    } 
    
    ElementsToCheck.forEach((element) => {
      const normalizedElement = getNormalized(element);
      const normalizedKeyword = getNormalized(keyword);
      if ( normalizedElement.match(normalizedKeyword) && !updatedArray.includes(recipe)) {
            updatedArray.push(recipe);
        }
    });
  }
  return updatedArray;
}

function SearchListInput(filterElements, input = '') {
  // Fonction qui filtre les éléments de la liste des filtres
  if (input.length > 0) {
    for (let i = 0; i < filterElements.length; i += 1) {
      const element = filterElements[i];
      console.log('element', element);
      const normalizedElement = getNormalized(element.textContent);
      console.log('normalizedElement', normalizedElement);
      const normalizedInput = getNormalized(input);
      console.log('normalizedInput', normalizedInput);
      if (!normalizedElement.match(normalizedInput)) {
        element.classList.add('d-none');
        element.classList.remove('d-flex');
      } else {
        element.classList.remove('d-none');
        element.classList.add('d-flex');
      }
    }
  }
}

export { SearchRecipes, SearchListInput };
