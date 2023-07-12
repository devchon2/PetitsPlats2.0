/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { recipesArray } from '../controllers/datasController.js';

console.log('search.js loaded')



function SearchRecipes(keyword) {
  const updatedArray = []

  recipesArray.forEach(recipe => {
    const {  description, ingredients, name } = recipe;
    console.log('description', description)
    const ElementsToCheck = [name, description ]

    for (let i = 0; i <= ingredients.lenght ; i += 1) {
      const { ingredient } = ingredients[i]
      ElementsToCheck.push(ingredient)
    }
    ElementsToCheck.forEach(element => {
      console.log('element', element) 
      if (element.match(keyword ) && !updatedArray.includes(recipe)) {
        updatedArray.push(recipe)
      }
    })})
    return updatedArray
  }

  function SearchFilters(updatedArray) {

    const NewappliancesArray = []
const NewIngredientsArray = []
const NewUstensilesArray = []

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
      

      const UpdatedFilterApplicances = {'appliances':NewappliancesArray}
      const UpdatedFilterIngredients = {'ingredients':NewIngredientsArray}
      const UpdatedFilterUstensiles = {'ustensils':NewUstensilesArray}
    const UpdatedElement = [ UpdatedFilterIngredients, UpdatedFilterApplicances,  UpdatedFilterUstensiles]
   
   

  return UpdatedElement
}






export { SearchRecipes, SearchFilters }