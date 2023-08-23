/**
 * Recherche dans les recettes en fonction d'une valeur de recherche.
 *
 * @param {string} ValueToSearch - La valeur à rechercher.
 * @param {Array} recipes - Liste des recettes à filtrer.
 * @returns {Array} - Liste des recettes correspondant à la recherche.
 */
function SearchFromMain(ValueToSearch, recipes) {
  return recipes.filter(recipe => {
    const { ingredients, name, description } = recipe;
    const ToCheck = [name, description, ...ingredients.map(ing => ing.ingredient)];
    return ToCheck.some(element => Normalized(element).match(Normalized(ValueToSearch)));
  });
}

/**
 * Recherche parmi les ingrédients des recettes.
 *
 * @param {string} ValueToSearch - La valeur à rechercher.
 * @param {Array} Actuals - Liste des éléments actuels.
 * @param {Array} recipes - Liste des recettes à filtrer.
 * @returns {Array} - Liste des recettes correspondant à la recherche d'ingrédients.
 */
function SearchFromIngredients(ValueToSearch, Actuals, recipes) {
  const normalizedKeyword = Normalized(ValueToSearch);

  return recipes.filter(recipe => 
    recipe.ingredients.some(ingr => 
      Normalized(ingr.ingredient) === normalizedKeyword)).filter(recipe => 
        Actuals.some(Recipe => Number(Recipe.id) === Number(recipe.id)));
}

/**
 * Recherche parmi les ustensiles des recettes.
 *
 * @param {string} ValueToSearch - La valeur à rechercher.
 * @param {Array} Actuals - Liste des éléments actuels.
 * @param {Array} recipes - Liste des recettes à filtrer.
 * @returns {Array} - Liste des recettes correspondant à la recherche d'ustensiles.
 */
function SearchFromUstensils(ValueToSearch, Actuals, recipes) {
  const normalizedKeyword = Normalized(ValueToSearch);

  return recipes.filter(recipe => 
    recipe.ustensils.some(Ustensil => 
      Normalized(Ustensil) === normalizedKeyword)).filter(recipe => 
        Actuals.some(Recipe => Number(Recipe.id) === Number(recipe.id)));
}

/**
 * Recherche parmi les appareils des recettes.
 *
 * @param {string} ValueToSearch - La valeur à rechercher.
 * @param {Array} Actuals - Liste des éléments actuels.
 * @param {Array} recipes - Liste des recettes à filtrer.
 * @returns {Array} - Liste des recettes correspondant à la recherche d'appareils.
 */
function SearchFromAppliances(ValueToSearch, Actuals, recipes) {
  const normalizedKeyword = Normalized(ValueToSearch);

  return recipes.filter(recipe => Normalized(recipe.appliance) === normalizedKeyword).filter(recipe => 
        Actuals.some(Recipe => Number(Recipe.id) === Number(recipe.id)));
}

/**
 * Recherche en fonction de la zone de filtre spécifiée.
 *
 * @param {string} ValueToSearch - La valeur à rechercher.
 * @param {string} filterZone - La zone de filtre (ingrédients, ustensiles, appareils).
 * @param {Array} recipes - Liste des recettes à filtrer.
 * @returns {Array} - Liste des recettes filtrées en fonction de la zone de filtre.
 */
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

/**
 * Filtre les recettes en fonction des labels.
 *
 * @param {Array} recipes - Liste des recettes à filtrer.
 * @returns {Array} - Liste des recettes filtrées en fonction des labels.
 */
function SearchFromDeleteLabel(recipes) { // une fonction qui récupère les labels et renvoie les recettes qui contiennent l'ensemble des labels
  const ActualsLabel = Array.from(document.querySelectorAll('.labels'));
  
  let Action = 'delete';
  let iteration = 0;
  let updatedRecipes = recipes;

  ActualsLabel.forEach(label => {
    const name = label.getAttribute('data-normalized');
    const type = label.getAttribute('data-type');

    if (iteration > 0) {
      Action = 'add';
    }

    if (type === 'ingredients') {
      updatedRecipes = SearchFromIngredients(name, updatedRecipes, recipes, Action);
      iteration += 1;

    } else if (type === 'ustensils') {
      updatedRecipes = SearchFromUstensils(name, updatedRecipes, recipes, Action);
      iteration += 1;

    } else if (type === 'appliances') {
      updatedRecipes = SearchFromAppliances(name, updatedRecipes, recipes, Action);
      iteration += 1;
    }
  });
    

  return updatedRecipes;
}

/**
 * Filtre les éléments de la liste des filtres en fonction de l'entrée.
 *
 * @param {Array} filters - Liste des éléments de filtre.
 * @param {string} input - Entrée à filtrer.
 */
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

/**
 * Normalise une chaîne de caractères en enlevant les accents et en la convertissant en minuscules.
 *
 * @param {string} str - Chaîne de caractères à normaliser.
 * @returns {string} - Chaîne de caractères normalisée.
 */
function Normalized(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replaceAll(' ', '').replace('\'', '').toLowerCase().trim();
}

// Exportation des fonctions pour une utilisation externe
export { SearchFromFilter, SearchFromMain, SearchListInput, SearchFromDeleteLabel, Normalized };
