console.log('datasController.js loaded');

const JSONDatas = './datas/recipes.json';

/**
 * Récupère les données du fichier JSON.
 * @returns {Promise<Object>} Les données JSON.
 */
async function getDatas() {
  try {
    const response = await fetch(JSONDatas);

    if (!response.ok) {
      if (response.status === 404) throw new Error('Aucun fichier trouvé');
    }
  } catch (e) {
    console.log(e);
  }

  const response = await fetch(JSONDatas);
  const datas = await response.json();

  return datas;
}

/**
 * Obtient tous les ingrédients disponibles.
 * @returns {Object} L'objet contenant tous les ingrédients.
 */
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
  
  const StartIngredientsArray = { 'Ingredients': IngredientsArray };
  return StartIngredientsArray;
}

/**
 * Obtient tout le matériel (appareils) disponible.
 * @returns {Object} L'objet contenant tout le matériel.
 */
function GetFullAppliance() {
  const AppliancesArray = [];
  recipesArray.forEach((recipeObject) => {
    const { appliance } = recipeObject;

    if (!AppliancesArray.includes(appliance)) {
      AppliancesArray.push(appliance);
    }
  });

  const FinalApplianceObject = { 'Matériel': AppliancesArray };
  return FinalApplianceObject;
}

/**
 * Obtient tous les ustensiles disponibles.
 * @returns {Object} L'objet contenant tous les ustensiles.
 */
function GetFullUstensils() {
  const UstensilsArray = [];
  recipesArray.forEach((recipeObject) => {
    const { ustensils } = recipeObject;
    ustensils.forEach((ustensil) => {
      if (!UstensilsArray.includes(ustensil)) {
        UstensilsArray.push(ustensil);
      }
    });
  });

  const FinalUstensilsObject = { 'Ustensiles': UstensilsArray };
  return FinalUstensilsObject;
}



// Récupération des données, des ingrédients, du matériel et des ustensiles
const recipesArray = await getDatas();
const IngredientsObject = GetFullIngredients();
const AppliancesObject = GetFullAppliance();
const UstensilesObject = GetFullUstensils();

export { recipesArray, IngredientsObject, AppliancesObject, UstensilesObject };
