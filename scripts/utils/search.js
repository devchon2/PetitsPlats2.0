/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { recipesArray } from '../controllers/datasController.js';
import { getNormalized } from '../controllers/RecipesController.js';

console.log('search.js loaded')



function SearchRecipes(keyword) {
  const updatedArray = []

  recipesArray.forEach(recipe => {
    const {  description, ingredients, name } = recipe;
    console.log('description', description)
    const ElementsToCheck = [name, description ]

    for (let i = 0; i <= ingredients.lenght ; i += 1) {
      const  {ingredient} = ingredients[i]
      console.log('ingredient-ELEMENTTOCHECK', ingredient)
      ElementsToCheck.push(ingredient)
    }
    ElementsToCheck.forEach(element => {
      const normalizedElement = getNormalized(element)
      const normalizedKeyword = getNormalized(keyword)
      if (normalizedElement.match(normalizedKeyword ) && !updatedArray.includes(recipe)) {
        updatedArray.push(recipe)
      }
    })})
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