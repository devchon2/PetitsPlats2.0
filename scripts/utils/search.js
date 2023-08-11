/* eslint-disable no-debugger */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */



console.log('search.js loaded');

function SearchFromMain(ValueToSearch, recipes) {
  const UpdatedRecipes = [];
  for (let i = 0; i < recipes.length; i += 1) {
    const recipe = recipes[i];
    const { ingredients } = recipe;
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

function SearchFromIngredients(ValueToSearch, Actuals, recipes, from = '') {
  let ActualsRecipe = Actuals;
  
  if (from === 'delete') {
    ActualsRecipe = recipes;
  }
  
  const UpdatedRecipes = [];
  for (let j = 0; j < recipes.length; j += 1) {
    const recipe = recipes[j];
    const { id, ingredients } = recipe;

    for (let i = 0; i < ActualsRecipe.length; i += 1) {
      const Recipe = ActualsRecipe[i];
      const id2Upd = Recipe.id;



      if (id == id2Upd) {

        for (let k = 0; k < ingredients.length; k += 1) {
          const ingr = ingredients[k];
          const { ingredient } = ingr;
          const normalizedKeyword = Normalized(ValueToSearch);
          const normalizedElement = Normalized(ingredient);

          if (normalizedKeyword.match(normalizedElement)) {

            if (!UpdatedRecipes.includes(recipe)) {
              UpdatedRecipes.push(recipe);

            }
          }
        }
      }
    }
  }

  return UpdatedRecipes;
}

function SearchFromUstensils(ValueToSearch, Actuals, recipes, from = '') {
  let ActualsRecipe = Actuals;

  if (from === 'delete') {
    ActualsRecipe = recipes;
  }

  const updatedArray = [];
  const normalizedKeyword = Normalized(ValueToSearch)

  for (let Recipe of ActualsRecipe) {

    for (let recipe of recipes) {
      const { id, ustensils } = recipe;
      const id2Upd = Recipe.id;

      if (id2Upd == id) {

        for (let ustensil of ustensils) {
          const normalizedElement = Normalized(ustensil)
          console.log(normalizedElement)
          console.log(normalizedKeyword)
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

function SearchFromAppliances(ValueToSearch, Actuals, recipes, from = '') {
  let ActualsRecipe = Actuals;
  
  if (from === 'delete') {
    ActualsRecipe = recipes;
  }

  const updatedArray = [];
  const normalizedKeyword = Normalized(ValueToSearch)


  for (let ActualRecipe of ActualsRecipe) {

    for (let i = 0; i < recipes.length; i += 1) {
      const { id, appliance } = recipes[i];
      const id2 = ActualRecipe.id;

      if (id == id2) {
        const normalizedElement = Normalized(appliance)


        if (normalizedKeyword.match(normalizedElement)) {

          if (!updatedArray.includes(recipes[i])) {
            updatedArray.push(recipes[i])

          }
        }
      }
    }
  }


  return updatedArray
}

function SearchFromFilter(ValueToSearch, filterZone, recipes) {
  const Actuals = Array.from(document.querySelectorAll('.recipeCard'));
    let UpdatedRecipes;
  
  if (filterZone === 'ingredients') {
    UpdatedRecipes = SearchFromIngredients(ValueToSearch, Actuals, recipes);

  } else if (filterZone === 'ustensils') {
    UpdatedRecipes = SearchFromUstensils(ValueToSearch, Actuals, recipes);

  } else if (filterZone === 'appliances') {
    UpdatedRecipes = SearchFromAppliances(ValueToSearch, Actuals, recipes);

  }

  return UpdatedRecipes;
}

function SearchFromDeleteLabel(recipes, MainInputValue) { // une fonction qui recuperes les labels et renvoi que les recettes qui contiennent l'ensemble des labels
    const ActualsLabel = Array.from(document.querySelectorAll('.labels'));
    debugger

  let UpdatedFinalRecipes = [ ]
  let Start = 'delete';
  
  let iteration = 0;
  for (let label of ActualsLabel) {
    const name = label.getAttribute('data-normalized');
    const type = label.getAttribute('data-type');
    let updatedRecipes;
    if (iteration > 0) {
      Start = '';
    }

    const ActualRecipes = Array.from(document.querySelectorAll('.recipeCard'));
    if (type === 'ingredients') {
       updatedRecipes = SearchFromIngredients(name, ActualRecipes, recipes, Start);
        
    } else if (type === 'ustensils') {
        updatedRecipes = SearchFromUstensils(name, ActualRecipes, recipes, Start);

    } else {
        updatedRecipes = SearchFromAppliances(name, ActualRecipes, recipes, Start);
          
    } 
    iteration += 1;
    for (let recipe of recipes) {
      const { id } = recipe;
      
      for (let updatedRecipe of updatedRecipes) {
        const { id: id2 } = updatedRecipe;
        if (id == id2) {
          UpdatedFinalRecipes.push(recipe);
        }
      }
      const id2Upd = updatedRecipes.id;
      if (id == id2Upd) {
        UpdatedFinalRecipes.push(recipe);
      }
    } 
  }

  if (UpdatedFinalRecipes.length === 0) {
    UpdatedFinalRecipes = SearchFromMain(MainInputValue, recipes);
  }

  return UpdatedFinalRecipes
}

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

// Fonction utilitaire pour normaliser les chaînes de caractères (enlever les accents et convertir en minuscules)
function Normalized(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replaceAll(' ', '').replace('\'', '').toLowerCase().trim();
}

export { SearchFromFilter, SearchFromMain, SearchListInput, SearchFromDeleteLabel, Normalized };