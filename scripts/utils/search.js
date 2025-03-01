function SearchFromMain(ValueToSearch, recipes) {
  return recipes.filter((recipe) => {
    const { ingredients, name, description } = recipe;
    const ToCheck = [
      name,
      description,
      ...ingredients.map((ing) => ing.ingredient),
    ];
    return ToCheck.some((element) =>
      Normalized(element).match(Normalized(ValueToSearch))
    );
  });
}

function SearchFromIngredients(ValueToSearch, Actuals, recipes) {
  const normalizedKeyword = Normalized(ValueToSearch);

  return recipes
    .filter((recipe) =>
      recipe.ingredients.some(
        (ingr) => Normalized(ingr.ingredient) === normalizedKeyword
      )
    )
    .filter((recipe) =>
      Actuals.some((Recipe) => Number(Recipe.id) === Number(recipe.id))
    );
}

function SearchFromUstensils(ValueToSearch, Actuals, recipes) {
  const normalizedKeyword = Normalized(ValueToSearch);

  return recipes
    .filter((recipe) =>
      recipe.ustensils.some(
        (Ustensil) => Normalized(Ustensil) === normalizedKeyword
      )
    )
    .filter((recipe) =>
      Actuals.some((Recipe) => Number(Recipe.id) === Number(recipe.id))
    );
}

function SearchFromAppliances(ValueToSearch, Actuals, recipes) {
  const normalizedKeyword = Normalized(ValueToSearch);

  return recipes
    .filter((recipe) => Normalized(recipe.appliance) === normalizedKeyword)
    .filter((recipe) =>
      Actuals.some((Recipe) => Number(Recipe.id) === Number(recipe.id))
    );
}

function SearchFromFilter(ValueToSearch, filterZone, recipes) {
  const Actuals = Array.from(document.querySelectorAll(".recipeCard"));
  let UpdatedRecipes;

  if (filterZone === "ingredients") {
    UpdatedRecipes = SearchFromIngredients(ValueToSearch, Actuals, recipes);
  } else if (filterZone === "ustensils") {
    UpdatedRecipes = SearchFromUstensils(ValueToSearch, Actuals, recipes);
  } else if (filterZone === "appliances") {
    UpdatedRecipes = SearchFromAppliances(ValueToSearch, Actuals, recipes);
  }

  return UpdatedRecipes;
}

function SearchFromDeleteLabel(recipes) {
  // une fonction qui recuperes les labels et renvoi que les recettes qui contiennent l'ensemble des labels
  const ActualsLabel = Array.from(document.querySelectorAll(".labels"));

  let iteration = 0;
  let updatedRecipes = recipes;

  ActualsLabel.forEach((label) => {
    const name = label.getAttribute("data-normalized");
    const type = label.getAttribute("data-type");

    if (type === "ingredients") {
      updatedRecipes = SearchFromIngredients(name, updatedRecipes, recipes);
      iteration += 1;
    } else if (type === "ustensils") {
      updatedRecipes = SearchFromUstensils(name, updatedRecipes, recipes);
      iteration += 1;
    } else if (type === "appliances") {
      updatedRecipes = SearchFromAppliances(name, updatedRecipes, recipes);
      iteration += 1;
    }
  });

  return updatedRecipes;
}

function SearchListInput(filters, input) {
  // Fonction qui filtre les éléments de la liste des filtres

  if (input !== 0) {
    for (const filter of filters) {
      const element = filter;
      const normalizedElement = Normalized(element.textContent);
      const normalizedInput = Normalized(input);

      if (!normalizedElement.match(normalizedInput)) {
        element.classList.add("d-none");
        element.classList.remove("d-flex");
      } else {
        element.classList.remove("d-none");
        element.classList.add("d-flex");
      }
    }
  }
}

// Fonction utilitaire pour normaliser les chaînes de caractères (enlever les accents et convertir en minuscules)
function Normalized(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll(" ", "")
    .replace("'", "")
    .toLowerCase()
    .trim();
}

export {
  SearchFromFilter,
  SearchFromMain,
  SearchListInput,
  SearchFromDeleteLabel,
  Normalized,
};
