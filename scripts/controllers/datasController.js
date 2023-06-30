console.log('datasController.js loaded');

const jsonDatas = './datas/recipes.json';

/**
 * Récupère les données du fichier JSON.
 * @returns {Promise<Object>} Les données JSON.
 */
async function getDatas() {
  try {
    const response = await fetch(jsonDatas);

    if (!response.ok) {
      if (response.status === 404) throw new Error('Aucun fichier trouvé');
    }
  } catch (e) {
    console.log(e);
  }

  const response = await fetch(jsonDatas);
  const datas = await response.json();

  return datas;
}

/**
 * Obtient tous les ingrédients disponibles.
 * @returns {Object} L'objet contenant tous les ingrédients.
 */
function getFullIngredients() {
  const ingredientsArray = [];
  recipesArray.forEach((recipeObject) => {
    const { ingredients } = recipeObject;
    ingredients.forEach((ingredientObject) => {
      const { ingredient } = ingredientObject;
      if (!ingredientsArray.includes(ingredient)) {
        ingredientsArray.push(ingredient);
      }
    });
  });
  
  const StartingredientsArray = { 'Ingredients': ingredientsArray };
  return StartingredientsArray;
}

/**
 * Obtient tout le matériel (appareils) disponible.
 * @returns {Object} L'objet contenant tout le matériel.
 */
function getFullAppliance() {
  const appliancesArray = [];
  recipesArray.forEach((recipeObject) => {
    const { appliance } = recipeObject;

    if (!appliancesArray.includes(appliance)) {
      appliancesArray.push(appliance);
    }
  });

  const finalApplianceObject = { 'Matériel': appliancesArray };
  return finalApplianceObject;
}

/**
 * Obtient tous les ustensiles disponibles.
 * @returns {Object} L'objet contenant tous les ustensiles.
 */
function getFullUstensils() {
  const ustensilsArray = [];
  recipesArray.forEach((recipeObject) => {
    const { ustensils } = recipeObject;
    ustensils.forEach((ustensil) => {
      if (!ustensilsArray.includes(ustensil)) {
        ustensilsArray.push(ustensil);
      }
    });
  });

  const FinalUstensilsObject = { 'Ustensiles': ustensilsArray };
  return FinalUstensilsObject;
}



// Récupération des données, des ingrédients, du matériel et des ustensiles
const recipesArray = await getDatas();
const ingredientsObject = getFullIngredients();
const appliancesObject = getFullAppliance();
const ustensilesObject = getFullUstensils();

export { recipesArray, ingredientsObject, appliancesObject, ustensilesObject };
