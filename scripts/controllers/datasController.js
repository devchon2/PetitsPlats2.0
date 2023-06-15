/* eslint-disable no-console */
// eslint-disable-next-line no-console
console.log('DataControllers.js loaded');
const docdatas = './datas/recipes.json';
async function getDatas() {
  try {
    /* if(!response.status.toString(200)) throw new Error(`${data.message}
    tesssssstttt ${response.status}`); */
    const response = await fetch(docdatas);

    if (!response.ok) {
      if (response.status === 404) throw new Error('aucun fichier valide');
    }
  } catch (e) {
    console.log(e);
  }
  const response = await fetch(docdatas);

  const data = await response.json();
  const recipesIngredientRaw = data.map((element) => element.ingredients);
  const recipesUstensilsRaw = data.map((element) => element.ustensils);
  const recipesAppliancesRaw = data.map((element) => element.appliance);

  console.log('data', data);
  console.log('reponse', response);
  console.log('tableau de listes des ingredients', recipesIngredientRaw);
  console.log('tableau de la liste des ustensiles', recipesUstensilsRaw);
  console.log("tableau de l'electroménager", recipesAppliancesRaw);
  return data;
}

// eslint-disable-next-line import/prefer-default-export
export { getDatas };
