function SearchFromMain(ValueToSearch, recipes) {
    const UpdatedRecipes = [];
    recipes.forEach(recipe => {
        const { ingredients, name, description } = recipe;
        const ElementsToCheck = [name, description, ...ingredients.map(ing => ing.ingredient)];
        ElementsToCheck.forEach(element => {
            const normalizedKeyword = Normalized(ValueToSearch);
            const normalizedElement = Normalized(element);
            if (normalizedElement.match(normalizedKeyword) && !UpdatedRecipes.includes(recipe)) {
                UpdatedRecipes.push(recipe);
            }
        });
    });
    return [...new Set(UpdatedRecipes)];
}

function SearchFromIngredients(ValueToSearch, Actuals, recipes, from = '') {
  
    const ActualsRecipe = from === 'delete' ? recipes : Actuals;
    const UpdatedRecipes = [];
    recipes.forEach(recipe => {
        const { id, ingredients } = recipe;
        ActualsRecipe.forEach(Recipe => {
            if (Number(id) === Number(Recipe.id)) {
                ingredients.forEach(ing => {
                    const { ingredient } = ing;
                    const normalizedKeyword = Normalized(ValueToSearch);
                    const normalizedElement = Normalized(ingredient);
                    if (normalizedKeyword.match(normalizedElement) && !UpdatedRecipes.includes(recipe)) {
                        UpdatedRecipes.push(recipe);
                    }
                });
            }
        });
    });
    return UpdatedRecipes;
}

function SearchFromUstensils(ValueToSearch, ActualsRecipe, recipes) {
  
    const updatedArray = [];
    const normalizedKeyword = Normalized(ValueToSearch);
    recipes.forEach(recipe => {
            const { id, ustensils } = recipe;
            ActualsRecipe.forEach(Recipe => {
        
            if (Number(Recipe.id) === Number(id)) {
                ustensils.forEach(ustensil => {
                    const normalizedElement = Normalized(ustensil);
                    if (normalizedKeyword.match(normalizedElement) && !updatedArray.includes(recipe)) {
                        updatedArray.push(recipe);
                    }
                });
            }
        });
    });
    return updatedArray;
}

function SearchFromAppliances(ValueToSearch, ActualsRecipe, recipes) {
  
    const updatedArray = [];
    const normalizedKeyword = Normalized(ValueToSearch);
    ActualsRecipe.forEach(Recipe => {
        recipes.forEach(recipe => {
            const { id, appliance } = recipe;
            if (Number(Recipe.id) === Number(id)) {
                const normalizedElement = Normalized(appliance);
                if (normalizedKeyword.match(normalizedElement) && !updatedArray.includes(recipe)) {
                    updatedArray.push(recipe);
                }
            }
        });
    });
    return updatedArray;
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
    
    ActualsLabel.forEach(label => {
        const name = label.getAttribute('data-normalized');
        const type = label.getAttribute('data-type');
        let updatedRecipes;
        if (iteration > 0) {
            Action = '';
        }
        const ActualRecipes = Array.from(document.querySelectorAll('.recipeCard'));
        if (type === 'ingredients') {
            updatedRecipes = SearchFromIngredients(name, ActualRecipes, recipes, Action);
        } else if (type === 'ustensils') {
            updatedRecipes = SearchFromUstensils(name, ActualRecipes, recipes, Action);
        } else {
            updatedRecipes = SearchFromAppliances(name, ActualRecipes, recipes, Action);
        }
        iteration += 1;
        recipes.forEach(recipe => {
            if (updatedRecipes.some(updatedRecipe => updatedRecipe.id === recipe.id)) {
                UpdatedFinalRecipes.push(recipe);
            }
        });
    });
    if (UpdatedFinalRecipes.length === 0) {
        UpdatedFinalRecipes = SearchFromMain(MainInputValue, recipes);
    }
    return UpdatedFinalRecipes;
}

function SearchListInput(filters, input) {
    if (input !== 0) {
        const normalizedInput = Normalized(input);
        filters.forEach(filter => {
            const normalizedElement = Normalized(filter.textContent);
            if (!normalizedElement.match(normalizedInput)) {
                filter.classList.add('d-none');
                filter.classList.remove('d-flex');
            } else {
                filter.classList.remove('d-none');
                filter.classList.add('d-flex');
            }
        });
    }
}

// Fonction utilitaire pour normaliser les chaînes de caractères (enlever les accents et convertir en minuscules)
function Normalized(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replaceAll(' ', '').replace('\'', '').toLowerCase().trim();
}

export { SearchFromFilter, SearchFromMain, SearchListInput, SearchFromDeleteLabel, Normalized };