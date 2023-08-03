/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { recipesArray } from '../controllers/datasController.js';
import { getNormalized } from '../controllers/RecipesController.js';


console.log('search.js loaded');



function SearchFromMain(ValuesToSearch) {
  const UpdatedRecipes = [];
  for (let i = 0; i < recipesArray.length; i += 1) {
    const recipe = recipesArray[i];
    const { description, ingredients, name } = recipe;
    const ElementsToCheck = [name, description];

    for (let j = 0; j <= ingredients.length - 1; j += 1) {
      const ingr = ingredients[j];
      const { ingredient } = ingr;
      ElementsToCheck.push(ingredient);
    }

    for (let k = 0; k < ElementsToCheck.length; k += 1) {
      const element = ElementsToCheck[k];
      const normalizedKeyword = getNormalized(ValuesToSearch);
      const normalizedElement = getNormalized(element);
      if (normalizedElement.match(normalizedKeyword) && !UpdatedRecipes.includes(recipe)) {
        UpdatedRecipes.push(recipe)
      }
    }
  }
  return UpdatedRecipes;
}

function SearchFromIngredients(ValuesToSearch, recipesToUpdate) {

  const updatedArray = [];

  for (let i = 0; i < recipesArray.length; i += 1) {
    const { id, ingredients } = recipesArray[i];
    debugger
    for (let rec2Upd of recipesToUpdate) {
      const id2 = rec2Upd.id;
      if (id == id2) {

        for (let ingr of ingredients) {
          const { ingredient } = ingr
          const normalizedElement = getNormalized(ingredient)

          for (let keyword of ValuesToSearch) {
            const normalizedKeyword = getNormalized(keyword)
            if (normalizedElement.match(normalizedKeyword)) {
              if (!updatedArray.includes(recipesArray[i])) {
                updatedArray.push(recipesArray[i])
              }
            }
          }
        }
      }
    }
  }
  return updatedArray
}





function SearchFromUstensils(ValuesToSearch, recipesToUpdate) {
  const updatedArray = [];

  for (let i = 0; i < recipesArray.length; i += 1) {
    const { id, ustensils } = recipesArray[i];
    debugger
    for (let rec2Upd of recipesToUpdate) {
      const id2 = rec2Upd.id;
      if (id == id2) {

        for (let ustensil of ustensils) {

          const normalizedElement = getNormalized(ustensil)

          for (let keyword of ValuesToSearch) {
            const normalizedKeyword = getNormalized(keyword)
            if (normalizedElement.match(normalizedKeyword)) {
              if (!updatedArray.includes(recipesArray[i])) {
                updatedArray.push(recipesArray[i])
              }
            }
          }
        }
      }
    }
  }
  return updatedArray
}

function SearchFromAppliances(ValuesToSearch, recipesToUpdate) {
  const updatedArray = [];

  for (let i = 0; i < recipesArray.length; i += 1) {
    const { id, appliance } = recipesArray[i];
    debugger
    for (let rec2Upd of recipesToUpdate) {
      const id2 = rec2Upd.id;
      if (id == id2) {

        const normalizedElement = getNormalized(appliance)

        for (let keyword of ValuesToSearch) {
          const normalizedKeyword = getNormalized(keyword)
          if (normalizedElement.match(normalizedKeyword)) {
            if (!updatedArray.includes(recipesArray[i])) {
              updatedArray.push(recipesArray[i])
            }
          }
        }
      }
    }
  }

return updatedArray
}


function SearchFromFilter(ValuesToSearch, filterId) {
  console.log(...ValuesToSearch)
  const recipesToUpdate = Array.from(document.querySelectorAll('.recipeCard'));
  let UpdatedRecipes;
  if (ValuesToSearch.length === 0) {
    UpdatedRecipes = recipesArray;
  } else if (filterId === 'ingredients') {
    UpdatedRecipes = SearchFromIngredients(ValuesToSearch, recipesToUpdate);
  } else if (filterId === 'ustensils') {
    UpdatedRecipes = SearchFromUstensils(ValuesToSearch, recipesToUpdate);
  } else if ('appliances') {
    UpdatedRecipes = SearchFromAppliances(ValuesToSearch, recipesToUpdate);
  }
  return UpdatedRecipes;
}



function SearchListInput(filterElements, input = '') {
  // Fonction qui filtre les éléments de la liste des filtres
  if (input.length > 0) {
    for (let i = 0; i < filterElements.length; i += 1) {
      const element = filterElements[i];
      console.log('element', element);
      const normalizedElement = getNormalized(element.textContent);
      console.log('normalizedElement', normalizedElement);
      const normalizedInput = getNormalized(input);
      console.log('normalizedInput', normalizedInput);
      if (!normalizedElement.match(normalizedInput)) {
        element.classList.add('d-none');
        element.classList.remove('d-flex');
      } else {
        element.classList.remove('d-none');
        element.classList.add('d-flex');
      }
    }
  }
}



export { SearchFromFilter, SearchFromMain, SearchListInput };