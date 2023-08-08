/* eslint-disable no-debugger */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { recipesArray } from '../controllers/datasController.js';
import { Normalized } from '../controllers/RecipesController.js';


console.log('search.js loaded');

function SearchFromMain(ValueToSearch) {
  const UpdatedRecipes = [];
  for (let i = 0; i < recipesArray.length; i += 1) {
    const recipe = recipesArray[i];
    const {ingredients} = recipe;
    const { name, description } = recipe;
    const ElementsToCheck = [name, description];

    for (let j = 0; j <= ingredients.length - 1; j += 1) {
      const ingr = ingredients[j];
      const { ingredient } = ingr;
      ElementsToCheck.push(ingredient);
    }

    for (let k = 0; k < ElementsToCheck.length; k += 1) {
      const element = ElementsToCheck[k];
      const normalizedKeyword = Normalized(ValueToSearch);
      const normalizedElement = Normalized(element);
      if (normalizedElement.match(normalizedKeyword) && !UpdatedRecipes.includes(recipe)) {
        UpdatedRecipes.push(recipe)
      }
    }
  }
  return UpdatedRecipes;
}

function SearchFromIngredients(ValueToSearch) {
  const ActualsRecipes = Array.from(document.querySelectorAll('.recipeCard'));
  const updatedArray = [];
  
  for (let ActualRecipe of ActualsRecipes) {
    const id2Upd = ActualRecipe.id;

    for (let recipe of recipesArray) {
      const { id, ingredients } = recipe;

      if (id == id2Upd) {

        for (let ingr of ingredients) {
          const { ingredient } = ingr
          const normalizedElement = Normalized(ingredient)

          if (ValueToSearch.match(normalizedElement)) {
            updatedArray.push(recipe)
          }
        }
      }
    }
  }
  console.log('updatedArray', updatedArray);
  return updatedArray
}

function SearchFromUstensils(ValueToSearch) {
  const ActualsRecipes = Array.from(document.querySelectorAll('.recipeCard'));
  const updatedArray = [];
  const normalizedKeyword = Normalized(ValueToSearch)

  for (let ActualRecipe of ActualsRecipes) {

    for (let recipe of recipesArray) {
      const { id, ustensils } = recipe;
      const id2Upd = ActualRecipe.id;

      if (id2Upd == id) {

        for (let ustensil of ustensils) {
          const normalizedElement = Normalized(ustensil)

          if (normalizedKeyword.match(normalizedElement)) {

            if (!updatedArray.includes(recipe)) {
              updatedArray.push(recipe)
            }
          }
        }
      }
    }
  }
  return updatedArray
}

function SearchFromAppliances(ValueToSearch) {
  const ActualsRecipes = Array.from(document.querySelectorAll('.recipeCard'));
  const updatedArray = [];
  const normalizedKeyword = Normalized(ValueToSearch)


  for (let ActualRecipe of ActualsRecipes) {

    for (let i = 0; i < recipesArray.length; i += 1) {
      const { id, appliance } = recipesArray[i];
      const id2 = ActualRecipe.id;

      if (id == id2) {
        const normalizedElement = Normalized(appliance)


        if (normalizedKeyword.match(normalizedElement)) {
          if (!updatedArray.includes(recipesArray[i])) {
            updatedArray.push(recipesArray[i])
          }
        }
      }
    }
  }


return updatedArray
}

function SearchFromFilter(ValueToSearch, filterZone) {

  const ActualsRecipes = Array.from(document.querySelectorAll('.recipeCard'));
  let UpdatedRecipes;
  if (filterZone === 'ingredients') {
    UpdatedRecipes = SearchFromIngredients(ValueToSearch, ActualsRecipes);
  } else if (filterZone === 'ustensils') {
    UpdatedRecipes = SearchFromUstensils(ValueToSearch, ActualsRecipes);
  } else if (filterZone === 'appliances') {
    UpdatedRecipes = SearchFromAppliances(ValueToSearch, ActualsRecipes);
  }
  return UpdatedRecipes;
}

function SearchFromDeleteLabel() {
  const ArrayOfLabels = Array.from(document.querySelectorAll('.labels'));
  for (let label of ArrayOfLabels) {
    const normalizedName = label.getAttribute('data-normalized');
    const type = label.getAttribute('data-type');
    console.log('normalizedName', normalizedName);
    console.log('type', type);


}}

function SearchListInput(filters, input) {
  // Fonction qui filtre les éléments de la liste des filtres
  if (input !== 0) {
    
    for (let filter of filters) {
      const element = filter;
      const normalizedElement = Normalized(element.textContent);
      const normalizedInput = Normalized(input);
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



export { SearchFromFilter, SearchFromMain, SearchListInput, SearchFromDeleteLabel };