console.log('datasController.js chargé');
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
      const normalizedIngredient = ingredient.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (!ingredientsArray.includes(normalizedIngredient.toLowerCase())) {
        ingredientsArray.push(normalizedIngredient.toLowerCase());
      }
    });
  });

  const StartingredientsArray = { 'ingredients': ingredientsArray };
  return StartingredientsArray;
}

/**
 * Obtient tout le matériel (appareils) disponible.
 * @returns {Object} L'objet contenant tout le matériel.
 */
function getFullAppliance() {
  const appliancesArray = [];
  recipesArray.forEach((recipe) => {
    const { appliance } = recipe;
    const normalizedAppliance = appliance.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (!appliancesArray.includes(normalizedAppliance.toLowerCase())) {
      appliancesArray.push(normalizedAppliance.toLowerCase());
    }
  });

  const finalApplianceObject = { 'appliances': appliancesArray };
  return finalApplianceObject;
}

/**
 * Obtient tous les ustensiles disponibles.
 * @returns {Object} L'objet contenant tous les ustensiles.
 */
function getFullUstensils() {
  const ustensilsArray = [];
  
  recipesArray.forEach((recipe) => {
    const { ustensils } = recipe;
    ustensils.forEach((ustensil) => {
      const normalizedUstensil = ustensil.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (!ustensilsArray.includes(normalizedUstensil.toLowerCase())) {
        ustensilsArray.push(normalizedUstensil.toLowerCase());
      }
    });  
  });

  const finalUstensilsObject = { 'ustensils': ustensilsArray };
  return finalUstensilsObject;
}

// Récupération des données, des ingrédients, du matériel et des ustensiles
const recipesArray = await getDatas();
const ingredientsObject = getFullIngredients();
const appliancesObject = getFullAppliance();
const ustensilesObject = getFullUstensils();

export { recipesArray, ingredientsObject, appliancesObject, ustensilesObject };
