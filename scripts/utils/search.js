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


  function SearchListInput(input, filterElements) {// Fonction qui filtre les éléments de la liste des filtres
    filterElements.forEach((element) => {
      const elementName = element.querySelector('.filterName').innerHTML.toLowerCase();
      if (elementName.indexOf(input.value.toLowerCase()) <0) {
        element.classList.add('hidden');
      } 
    });
  }






export { SearchRecipes, SearchListInput }