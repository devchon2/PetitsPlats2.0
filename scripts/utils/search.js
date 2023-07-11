/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { Recipe } from '../controllers/RecipesController.js';
import { appliancesObject, ingredientsObject, recipesArray, ustensilesObject } from '../controllers/datasController.js';
import { createFilter } from './Filters.js';

import { Label } from './labels.js';

console.log('search.js loaded')

const NewappliancesArray = appliancesObject
const NewIngredientsArray = ingredientsObject
const NewUstensilesArray = ustensilesObject

function Search(keyword) {
  const updatedArray = []

  recipesArray.forEach(Recipes => {

    const { appliance, description, id, image, ingredients, name, servings, time, ustensils } = Recipes;
    const recipe = new Recipe(appliance, description, id, image, ingredients, name, servings, time, ustensils);
    const ElementsToCheck = [name, description, ingredients]

    for (let i = 0; i<=appliancesObject.length -1;i+=1){
      if (appliancesObject[i].match(appliance))
      NewappliancesArray.push(appliance)
    }
    
      
    ustensils.forEach(element => {
      for (let i = 0; i<=ustensilesObject.length -1 ;i+=1){
      if (ustensilesObject[i].match(element))
      NewUstensilesArray.push(element)
    }
  })
  
    

    for (let i = 0; i <= ingredientsObject.length ; i += 1) {
      const { ingredient } = ingredients[i]
      if (ingredient && !NewIngredientsArray.includes(ingredient)) {
        ElementsToCheck.push(ingredient)

      }
      NewIngredientsArray.push(...ingredients)
    }
    ElementsToCheck.forEach(element => {
      if (element.includes(keyword) && !updatedArray.includes(recipe)) {
        updatedArray.push(recipe)
      }
    })




    // createFilter('Ustensiles',NewUstensilesArray)
    // createFilter('appliance',NewappliancesArray)
    // createFilter('ingredients',NewIngredientsArray)
    
  })
  return updatedArray
}






export { Search }
