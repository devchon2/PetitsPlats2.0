/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { appliancesObject, ingredientsObject, recipesArray, ustensilesObject } from '../controllers/datasController.js';
import { createAllFilters, createFilter } from './filters.js';

import { Label } from './labels.js';

console.log('search.js loaded')

const NewappliancesArray = []
const NewIngredientsArray = []
const NewUstensilesArray = []
  const updatedArray = []

function SearchRecipes(keyword) {

  recipesArray.forEach(recipe => {

    const { description, ingredients, name } = recipe;
    console.log('ingredients Search ',ingredients)
    const ElementsToCheck = [name, description]
    for (let i = 0; i <= ingredients.len; i += 1) {
      const { ingredient } = ingredients[i]
      ElementsToCheck.push(ingredient)
    }

    ElementsToCheck.forEach(element => {
      if (element.includes(keyword) && !updatedArray.includes(recipe)) {
        updatedArray.push(recipe)
      }
    })
  })
  return updatedArray
}
function SearchFilters(recipes) {
  recipes.forEach(recipe => {
    const { appliance, ingredients, ustensils } = recipe;
    if (!NewappliancesArray.includes(appliance)) {
      NewappliancesArray.push(appliance)
    }
    ingredients.forEach(element => {
      if (!NewIngredientsArray.includes(element.ingredient)) {
        NewIngredientsArray.push(element.ingredient)
      }
    })
    ustensils.forEach(element => {
      if (!NewUstensilesArray.includes(element)) {
        NewUstensilesArray.push(element)
      }
    })
  })

  const UpdatedFilterApplicances = { 'appliances': NewappliancesArray }
  const UpdatedFilterIngredients = { 'ingredients': NewIngredientsArray }
  const UpdatedFilterUstensiles = { 'ustensils': NewUstensilesArray }
  const UpdatedElement = [UpdatedFilterIngredients, UpdatedFilterApplicances, UpdatedFilterUstensiles]
  console.log(UpdatedElement)


  return UpdatedElement
}






export { SearchRecipes, SearchFilters }