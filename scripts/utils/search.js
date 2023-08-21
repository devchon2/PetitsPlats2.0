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

function SearchFromIngredients(ValueToSearch, Actuals, recipes, from = 'add') {
  let ActualsRecipe = Actuals;

  if (from === 'delete') {
    ActualsRecipe = recipes;
  }

  const UpdatedRecipes = [];
  for (let j = 0; j < recipes.length; j += 1) {
    const recipe = recipes[j];
    const { id:id1, ingredients } = recipe;

    for (let ActualRecipe of ActualsRecipe) {
      const {id:id2} = ActualRecipe;
      
      if (Number(id1) === Number(id2)) {

        for (let k = 0; k < ingredients.length; k += 1) {
          const ingr = ingredients[k];
          const { ingredient } = ingr;
          const normalizedKeyword = Normalized(ValueToSearch);
          const normalizedElement = Normalized(ingredient);

          if (normalizedElement === normalizedKeyword) {

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

function SearchFromUstensils(ValueToSearch, Actuals, recipes, from = 'add') {
  let ActualsRecipe = Actuals;

  if (from === 'delete') {
    ActualsRecipe = recipes;
  }

  const updatedArray = [];
  const normalizedKeyword = Normalized(ValueToSearch)

  for (let ActualRecipe of ActualsRecipe) {
      const {id:id1} = ActualRecipe;

    for (let recipe of recipes) {
      const { id:id2, ustensils } = recipe;

      if (Number(id1) === Number(id2)) {

        for (let ustensil of ustensils) {
          const normalizedElement = Normalized(ustensil)
          console.log(normalizedElement)
          console.log(normalizedKeyword)
          if (normalizedElement === normalizedKeyword) {

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

function SearchFromAppliances(ValueToSearch, Actuals, recipes, from = 'add') {
  let ActualsRecipe = Actuals;

  if (from === 'delete') {
    ActualsRecipe = recipes;
  }

  const updatedArray = [];
  const normalizedKeyword = Normalized(ValueToSearch)

  for (let ActualRecipe of ActualsRecipe) {

    for (let recipe of recipes) {
      const { id: id1, appliance } = recipe;
      const {id:id2} = ActualRecipe;

      if (Number(id1) === Number(id2)) {
        const normalizedElement = Normalized(appliance)

        if (normalizedElement === normalizedKeyword) {

          if (!updatedArray.includes(recipe)) {
            updatedArray.push(recipe)

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

function SearchFromDeleteLabel(recipes, MainInputValue) {
  const ActualsLabel = Array.from(document.querySelectorAll('.labels'));

  let UpdatedFinalRecipes = [];
  let Action = 'delete';

  let iteration = 0;
  
  for (let label of ActualsLabel) {
    const name = label.getAttribute('data-normalized');
    const type = label.getAttribute('data-type');
    const ActualRecipes = Array.from(document.querySelectorAll('.recipeCard'));
    if (iteration > 0) {
      Action = 'add';
    }

    let Results;
    if (type === 'ingredients') {
      Results = SearchFromIngredients(name, ActualRecipes, recipes, Action);

    } else if (type === 'ustensils') {
      Results = SearchFromUstensils(name, ActualRecipes, recipes, Action);

    } else {
      Results = SearchFromAppliances(name, ActualRecipes, recipes, Action);
    }

    if (iteration === 0) {
      UpdatedFinalRecipes.push(...Results)
      iteration += 1; 
    } else {
      const newUpdatedFinalRecipes = [];
      for (const FinalRecipe of UpdatedFinalRecipes) {
        for (const result of Results) {
          if (Number(FinalRecipe.id) === Number(result.id)) {
            newUpdatedFinalRecipes.push(FinalRecipe);
          }
        }
      }
      UpdatedFinalRecipes = newUpdatedFinalRecipes;
    }
  }

  

  return UpdatedFinalRecipes;
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