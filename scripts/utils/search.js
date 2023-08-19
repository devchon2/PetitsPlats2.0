/* eslint-disable no-restricted-syntax */
function SearchFromMain(ValueToSearch, recipes) {
  return recipes.filter(recipe => {
      const { ingredients, name, description } = recipe;
      const ToCheck = [name, description, ...ingredients.map(ing => ing.ingredient)]
      return ToCheck.some(element => Normalized(element).match(Normalized(ValueToSearch))) 
     })
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
  
      for (const ActualRecipe of ActualsRecipe) {
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
  
    for (const ActualRecipe of ActualsRecipe) {
        const {id:id1} = ActualRecipe;
  
      for (const recipe of recipes) {
        const { id:id2, ustensils } = recipe;
  
        if (Number(id1) === Number(id2)) {
  
          for (const ustensil of ustensils) {
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
  
    for (const ActualRecipe of ActualsRecipe) {
  
      for (const recipe of recipes) {
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
  
  function SearchFromDeleteLabel(recipes, MainInputValue) { // une fonction qui recuperes les labels et renvoi que les recettes qui contiennent l'ensemble des labels
    const ActualsLabel = Array.from(document.querySelectorAll('.labels'));
    debugger
  
    let UpdatedFinalRecipes = []
    let Action = 'delete';
  
    let iteration = 0;
    for (const label of ActualsLabel) {
      const name = label.getAttribute('data-normalized');
      const type = label.getAttribute('data-type');
      let updatedRecipes;
      const ActualRecipes = Array.from(document.querySelectorAll('.recipeCard'));
      if (iteration > 0) {
        Action = 'add';
      }
  
      if (type === 'ingredients') {
        updatedRecipes = SearchFromIngredients(name, ActualRecipes, recipes, Action);
  
      } else if (type === 'ustensils') {
        updatedRecipes = SearchFromUstensils(name, ActualRecipes, recipes, Action);
  
      } else {
        updatedRecipes = SearchFromAppliances(name, ActualRecipes, recipes, Action);
      }
  
      if (iteration === 0) { // si c'est la premiere iteration on met a jour le tableau final
        UpdatedFinalRecipes.push(...updatedRecipes);
        iteration += 1;
  
      } else{
        
        for (const UpdatedFinalRecipe of UpdatedFinalRecipes) {
        const { id: id1 } = UpdatedFinalRecipe
        
        for (const updrecipe of updatedRecipes) {
          const { id: id2 } = updrecipe;
          
          if (id1 !== id2 && UpdatedFinalRecipes.includes(UpdatedFinalRecipe)) {
            UpdatedFinalRecipes.pop(UpdatedFinalRecipe)
          }
        }
      }
    }}
  
    if (UpdatedFinalRecipes.length === 0) {
      UpdatedFinalRecipes = SearchFromMain(MainInputValue, recipes);
    }
  
    return UpdatedFinalRecipes
  }
  
  function SearchListInput(filters, input) {
    // Fonction qui filtre les éléments de la liste des filtres
    if (input !== 0) {
  
      for (const filter of filters) {
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