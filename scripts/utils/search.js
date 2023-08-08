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

function SearchFromIngredients(ValueToSearch,Actuals, recipes) {debugger
  const UpdatedRecipes = [];
  for (let j = 0; j < recipes.length; j += 1) {
    const recipe = recipes[j];
    const { id, ingredients } = recipe;
    
    for (let i = 0; i < Actuals.length; i += 1) {
      const Recipe = Actuals[i];
      const id2Upd = Recipe.id;
      


      if (id == id2Upd) {

        for (let k = 0; k < ingredients.length; k += 1) {
          console.log('ingredients', ingredients);
          const ingr = ingredients[k];
          console.log('ingr', ingr);
          const { ingredient } = ingr;
          const normalizedKeyword = Normalized(ValueToSearch);
          const normalizedElement = Normalized(ingredient);
          console.log()
          console.log('ingredient', ingredient);
          if (normalizedKeyword.match(normalizedElement)) {
            console.log('ingredient trouvé', ingredient);
            if (!UpdatedRecipes.includes(recipe)) {
              UpdatedRecipes.push(recipe);
            }
          }
        }
      }
    }
  }
  console.log('UpdatedRecipes Ingredients', UpdatedRecipes);
  return UpdatedRecipes;
}


function SearchFromUstensils(ValueToSearch,Actuals, recipes) {
  
  const updatedArray = [];
  const normalizedKeyword = Normalized(ValueToSearch)

  for (let Recipe of Actuals) {

    for (let recipe of recipes) {
      const { id, ustensils } = recipe;
      const id2Upd = Recipe.id;

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

function SearchFromAppliances(ValueToSearch,Actuals, recipes) {
  
  const updatedArray = [];
  const normalizedKeyword = Normalized(ValueToSearch)


  for (let Recipe of Actuals) {

    for (let i = 0; i < recipes.length; i += 1) {
      const { id, appliance } = recipes[i];
      const id2 = Recipe.id;

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
    UpdatedRecipes = SearchFromIngredients(ValueToSearch,Actuals, recipes);
 
  } else if (filterZone === 'ustensils') {
    UpdatedRecipes = SearchFromUstensils(ValueToSearch,Actuals, recipes);
  
  } else if (filterZone === 'appliances') {
    UpdatedRecipes = SearchFromAppliances(ValueToSearch, Actuals, recipes);
  
  }

  return UpdatedRecipes;
}

function SearchFromDeleteLabel(recipes) { // une fonction qui recuperes les labels et renvoi que les recettes qui contiennent l'ensemble des labels
  console.log('SearchFromDeleteLabel');
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
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replaceAll(' ','').replace('\'','').toLowerCase().trim();
}

export { SearchFromFilter, SearchFromMain, SearchListInput, SearchFromDeleteLabel, Normalized };