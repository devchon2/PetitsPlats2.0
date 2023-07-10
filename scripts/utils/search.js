/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { recipesArray } from '../controllers/datasController.js';

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
    })
    console.log(ElementsToCheck)
})

      updatedArray.forEach(recipe => {
        const { appliance, ingredients, ustensils } = recipe;
        if (!NewappliancesArray.includes(appliance)){
          NewappliancesArray.push(appliance)
        }
        ingredients.forEach(element => {
          if (!NewIngredientsArray.includes(element.ingredients)){
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
   console.log(UpdatedElement)
   

  return [updatedArray, UpdatedElement]
}






export { Search }
