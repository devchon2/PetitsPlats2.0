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
    // eslint-disable-next-line no-console
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
      if (!ingredientsArray.includes(ingredient.toLowerCase())) {
        ingredientsArray.push(ingredient.toLowerCase());
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
    if (!appliancesArray.includes(appliance.toLowerCase())) {
      appliancesArray.push(appliance.toLowerCase());
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
      if (!ustensilsArray.includes(ustensil.toLowerCase())) {
        ustensilsArray.push(ustensil.toLowerCase());
      }
    })});

  const finalUstensilsObject = { 'ustensils': ustensilsArray };
  return finalUstensilsObject;
}

// Récupération des données, des ingrédients, du matériel et des ustensiles
const recipesArray = await getDatas();
const ingredientsObject = getFullIngredients();
const appliancesObject = getFullAppliance();
const ustensilesObject = getFullUstensils();
export { recipesArray, ingredientsObject, appliancesObject, ustensilesObject };
