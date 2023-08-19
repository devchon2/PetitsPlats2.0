/* eslint-disable no-constant-condition */
/* eslint-disable no-restricted-syntax */
function SearchFromMain(ValueToSearch, recipes) {
  return recipes.filter(recipe => {
    const { ingredients, name, description } = recipe;
    const ToCheck = [name, description, ...ingredients.map(ing => ing.ingredient)]
    return ToCheck.some(element => Normalized(element).match(Normalized(ValueToSearch)))
  })
}

function SearchFromIngredients(ValueToSearch, Actuals, recipes, Action = 'add') {
  const normalizedKeyword = Normalized(ValueToSearch);
  const ActualsRecipe = Action === 'delete' ? recipes : Actuals;

  return recipes.filter(recipe => 
    recipe.ingredients.some(ingr => 
      Normalized(ingr.ingredient) === normalizedKeyword)).filter(recipe => 
        ActualsRecipe.some(Recipe => Number(Recipe.id) === Number(recipe.id)))
  }


function SearchFromUstensils(ValueToSearch, Actuals, recipes, Action = 'add') {
  const normalizedKeyword = Normalized(ValueToSearch);
  const ActualsRecipe = Action === 'delete' ? recipes : Actuals;

  return recipes.filter(recipe => 
    recipe.ustensils.some(Ustensil => 
      Normalized(Ustensil) === normalizedKeyword)).filter(recipe => 
        ActualsRecipe.some(Recipe => Number(Recipe.id) === Number(recipe.id)))
  }

function SearchFromAppliances(ValueToSearch, Actuals, recipes, Action = 'add') {
  const normalizedKeyword = Normalized(ValueToSearch);
  const ActualsRecipe = Action === 'delete' ? recipes : Actuals;

  return recipes.filter(recipe => Normalized(recipe.appliance) === normalizedKeyword).filter(recipe => 
        ActualsRecipe.some(Recipe => Number(Recipe.id) === Number(recipe.id)))
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

    } else {

      for (const UpdatedFinalRecipe of UpdatedFinalRecipes) {
        const { id: id1 } = UpdatedFinalRecipe

        for (const updrecipe of updatedRecipes) {
          const { id: id2 } = updrecipe;

          if (id1 !== id2 && UpdatedFinalRecipes.includes(UpdatedFinalRecipe)) {
            UpdatedFinalRecipes.pop(UpdatedFinalRecipe)
          }
        }
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