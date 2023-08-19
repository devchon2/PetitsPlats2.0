
function SearchFromMain(ValueToSearch, recipes) {
    const normalizedKeyword = Normalized(ValueToSearch);

    return recipes.filter(recipe => {
        const { name, description, ingredients } = recipe;
        const ElementsToCheck = [name, description, ...ingredients.map(ingr => ingr.ingredient)];
        return ElementsToCheck.some(element => Normalized(element) === (normalizedKeyword));
    });
}




function SearchFromIngredients(ValueToSearch, Actuals, recipes, Action = 'Add') {
debugger;
    const ActualsRecipes = Action === 'delete' ? recipes : Actuals;

    const test = recipes.filter(recipe => 
        ActualsRecipes.foreach(Recipe => 
            Number(Recipe.id) === Number(recipe.id) && recipe.ingredients.some(ingr => Normalized(ingr.ingredient) === Normalized(ValueToSearch))))
        return test;
}


function SearchFromUstensils(ValueToSearch, Actuals, recipes, Action = 'Add') {
    const ActualsRecipes = Action === 'delete' ? recipes : Actuals;



    const updatedArray = [];
    const normalizedKeyword = Normalized(ValueToSearch);
    recipes.forEach(recipe => {
        const { id, ustensils } = recipe;
        ActualsRecipes.forEach(Recipe => {

            if (Number(Recipe.id) === Number(id)) {
                ustensils.forEach(ustensil => {
                    const normalizedElement = Normalized(ustensil);
                    if (normalizedElement === normalizedKeyword && !updatedArray.includes(recipe)) {
                        updatedArray.push(recipe);
                    }
                });
            }
        });
    });
    return updatedArray;
}

function SearchFromAppliances(ValueToSearch, Actuals, recipes, Action = 'Add') {
    const ActualsRecipes = Action === 'delete' ? recipes : Actuals;


    const updatedArray = [];
    const normalizedKeyword = Normalized(ValueToSearch);
    recipes.forEach(recipe => {
        const { id, appliance } = recipe;

        ActualsRecipes.forEach(Recipe => {

            if (Number(Recipe.id) === Number(id)) {
                const normalizedElement = Normalized(appliance);
                if (normalizedElement === normalizedKeyword && !updatedArray.includes(recipe)) {
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

function SearchFromDeleteLabel(recipes) {
    debugger;
    const ActualsLabels = Array.from(document.querySelectorAll('.labels'));
    let UpdatedFinalRecipes = [];
    let Action = 'delete';
    let iteration = 0;

    if (ActualsLabels.length < 1) {
        UpdatedFinalRecipes = [...recipes];
    
    } else if (ActualsLabels.length > 0) {
        
        ActualsLabels.forEach(label => {
            const name = label.getAttribute('data-normalized');
            const type = label.getAttribute('data-type');
            const ActualRecipes = Array.from(document.querySelectorAll('.recipeCard'));
            let updatedRecipes;

            if (iteration > 0) {
                Action = 'Add';
            }

            if (type === 'ingredients') {
                updatedRecipes = SearchFromIngredients(name, ActualRecipes, recipes, Action);

            } else if (type === 'ustensils') {
                updatedRecipes = SearchFromUstensils(name, ActualRecipes, recipes, Action);

            } else {
                updatedRecipes = SearchFromAppliances(name, ActualRecipes, recipes, Action);
            }

            recipes.forEach(recipe => {

                if (updatedRecipes.some(updatedRecipe => updatedRecipe.id === recipe.id && UpdatedFinalRecipes.includes(recipe))) {
                    UpdatedFinalRecipes.push(recipe);
                }
            });            
            iteration += 1;

        })
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