/* eslint-disable no-unreachable-loop */
/* eslint-disable import/prefer-default-export */

const JSONDatas = './datas/recipes.json';
async function getDatas() {
  try {
    const response = await fetch(JSONDatas);

    if (!response.ok) {
      if (response.status === 404) throw new Error('aucun fichier trouvé');
    }
  } catch (e) {
    console.log(e);
  }

  const response = await fetch(JSONDatas);
  const datas = await response.json();

  return datas;
}

function GetFullIngredients() {
  const IngredientsArray = [];
  recipesArray.forEach((recipeObject) => {
    const { ingredients } = recipeObject;
    ingredients.forEach((ingredientObject) => {
      const { ingredient } = ingredientObject;
      if (!IngredientsArray.includes(ingredient)) {
        IngredientsArray.push(ingredient);
      }
    });
  });

  return IngredientsArray;
}

 function GetFullAppliance() {
  const AppliancesArray = [];
  recipesArray.forEach((recipeObject) => {
    const { appliance } = recipeObject;

    if (!AppliancesArray.includes(appliance)) {
      AppliancesArray.push(appliance);
    }
  });

  return AppliancesArray;
}

 function GetFullUstensils() {
  const UstensilsArray = [];
  recipesArray.forEach((recipeObject) => {
    const { Ustensils } = recipeObject;
    Ustensils.forEach((Ustensil) => {
      if (!UstensilsArray.includes(Ustensil)) {
        UstensilsArray.push(Ustensil);
      }
    });
  });

  return UstensilsArray;
}

const recipesArray = await getDatas();
const IngredientsArray =  GetFullIngredients();
const AppliancesArray =  GetFullAppliance();
// const UstensilsArray =  GetFullUstensils();
console.log('recette', recipesArray);
console.log('Ingredients', IngredientsArray);
console.log('appliance', AppliancesArray);
// console.log('Ustensils', UstensilsArray);

// eslint-disable-next-line no-unused-vars
export { recipesArray };
