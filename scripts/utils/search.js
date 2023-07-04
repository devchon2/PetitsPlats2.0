/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { Recipe } from '../controllers/RecipesController.js';
import { recipesArray } from '../controllers/datasController.js';

import { Label } from './labels.js';

console.log('search.js loaded')



function Search(keyword) {
  const updatedArray = []

  recipesArray.forEach(Recipes => {

    const { appliance, description, id, image, ingredients, name, servings, time, ustensils } = Recipes;
    const recipe = new Recipe(appliance, description, id, image, ingredients, name, servings, time, ustensils);
    const ElementsToCheck = [name, description]

    for (let i = 0; i <= ingredients.length - 1; i += 1) {
      if (ingredients[i].ingredient) {
        ElementsToCheck.push(ingredients[i].ingredient)
      }
    }
    ElementsToCheck.forEach(element => {
      if (element.match(keyword) && !updatedArray.Recipes) {
        updatedArray.push(recipe)
      }

      
    })
  })
  return updatedArray
}






export { Search }
