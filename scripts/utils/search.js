/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { recipesArray } from '../controllers/datasController.js';
import { getNormalized } from '../controllers/RecipesController.js';

console.log('search.js loaded')



function SearchRecipes(keyword) {
  const updatedArray = []

  for (let i = 0; i < recipesArray.length; i += 1) {
    const recipe = recipesArray[i]
    const {  description, ingredients, name } = recipe;
    console.log('description', description)
    const ElementsToCheck = [name, description ]

    for (let j = 0; j <= ingredients.lenght ; j += 1) {
      const { ingredient } = ingredients[j]
      ElementsToCheck.push(ingredient)
    }

    for (let k = 0; k <= ElementsToCheck.lenght ; k += 1) {
      const element = ElementsToCheck[k]
      const normalizedElement = getNormalized(element)
      const normalizedKeyword = getNormalized(keyword)
      if (normalizedElement.match(normalizedKeyword ) && !updatedArray.includes(recipe)) {
        updatedArray.push(recipe)
      }
    }}
    return updatedArray
  }


  function SearchListInput(input, filterElements) {// Fonction qui filtre les éléments de la liste des filtres
    filterElements.forEach((element) => {
      const normalizedElement = getNormalized(element)
      console.log('normalizedElement', normalizedElement)
      const normalizedInput = getNormalized(input)
      console.log('normalizedInput', normalizedInput)
      if (!normalizedElement.match(normalizedInput)) {
        element.classList.add('hidden')
      } else {
        element.classList.remove('hidden')
      }
    })
  }






export { SearchRecipes, SearchListInput }