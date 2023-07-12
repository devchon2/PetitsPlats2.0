/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { appliancesObject, ingredientsObject, recipesArray, ustensilesObject } from '../controllers/datasController.js';
import { createAllFilters, createFilter } from './filters.js';

import { Label } from './labels.js';

console.log('search.js loaded')

const NewappliancesArray = []
const NewIngredientsArray = []
const NewUstensilesArray = []

function Search(keyword) {
  const updatedArray = []

  recipesArray.forEach(recipe => {

    const { appliance, description, id,  ingredients, name,  ustensils } = recipe;
    const ElementsToCheck = [name, description ]
    for (let i = 0; i <= ingredients.lenght ; i += 1) {
      const { ingredient } = ingredients[i]
      ElementsToCheck.push(ingredient)
    }

    ElementsToCheck.forEach(element => {
      if (element.includes(keyword) && !updatedArray.includes(recipe)) {
        updatedArray.push(recipe)
      }
    })})

      updatedArray.forEach(recipe => {
        const { appliance, ingredients, ustensils } = recipe;
        if (!NewappliancesArray.includes(appliance)){
          NewappliancesArray.push(appliance)
        }
        ingredients.forEach(element => {
          if (!NewIngredientsArray.includes(element.ingredient)){
          NewIngredientsArray.push(element.ingredient)
        }})
        ustensils.forEach(element => {
          if (!NewUstensilesArray.includes(element)){
          NewUstensilesArray.push(element)
        }
      })
      })
      

      const UpdatedFilterApplicances = {'Matériel':NewappliancesArray}
      const UpdatedFilterIngredients = {'Ingredients':NewIngredientsArray}
      const UpdatedFilterUstensiles = {'Ustensiles':NewUstensilesArray}
    const UpdatedElement = [ UpdatedFilterIngredients, UpdatedFilterApplicances,  UpdatedFilterUstensiles]
   
   

  return [updatedArray, UpdatedElement]
}






export { Search }