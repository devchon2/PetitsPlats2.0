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
      const normalizedElement = element.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
      const normalizedKeyword = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
      if (normalizedElement.match(normalizedKeyword ) && !updatedArray.includes(recipe)) {
        updatedArray.push(recipe)
      }
    })})
    return updatedArray
  }


  function SearchListInput(input, filterElements) {// Fonction qui filtre les éléments de la liste des filtres
    for (let i = 0; i < filterElements.length; i += 1) {
      
      const elementName = filterElements[i].textContent.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(' ', );
      if (!elementName.match(input) && !filterElements[i].classList.contains('inputFilterBtn')) {
        console.log('elementName', elementName)

        filterElements[i].classList.add('hidden');
        console.log('filtre supprimé' , filterElements[i])

      } else {
        console.log('elementName', elementName)
        filterElements[i].classList.remove('hidden');
        console.log('filtre ajouté' , filterElements[i])
      }
    }
    }
  
  






export { SearchRecipes, SearchListInput }