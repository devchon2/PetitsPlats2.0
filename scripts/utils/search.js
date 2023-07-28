/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { recipesArray } from '../controllers/datasController.js';
import { getNormalized, UpdateRecipes } from '../controllers/RecipesController.js';

console.log('search.js loaded')



function SearchRecipes(keyword, type = 'main') {
  const updatedArray = []

  recipesArray.forEach(recipe => {
    const { description, ingredients, name } = recipe;
    const ElementsToCheck = [name, description]

    for (let i = 0; i <= ingredients.lenght; i += 1) {
      const { ingredient } = ingredients[i]
      console.log('ingredient-ELEMENTTOCHECK', ingredient)
      ElementsToCheck.push(ingredient)
    }
    ElementsToCheck.forEach(element => {
      const normalizedElement = getNormalized(element)
      const normalizedKeyword = getNormalized(keyword)
      if (normalizedElement.match(normalizedKeyword) && !updatedArray.includes(recipe)) {
        updatedArray.push(recipe)
      }
    })
  })
  return updatedArray
}


function SearchListInput(filterElements, input = '') {// Fonction qui filtre les éléments de la liste des filtres
  if (input.length > 0) {
    for (let i = 0; i < filterElements.length; i += 1) {
      const element = filterElements[i];
      console.log('element', element)
      const normalizedElement = getNormalized(element.textContent)
      console.log('normalizedElement', normalizedElement)
      const normalizedInput = getNormalized(input)
      console.log('normalizedInput', normalizedInput)
      if (!normalizedElement.match(normalizedInput) ) {
        element.classList.add('d-none')
        element.classList.remove('d-flex')
        } else {       
      element.classList.remove('d-none')
      element.classList.add('d-flex')

    }
  }
}

}




export { SearchRecipes, SearchListInput }