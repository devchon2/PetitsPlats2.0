/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
// eslint-disable-next-line no-console
// console.log('DataControllers.js loaded');
const docdatas = './datas/recipes.json';
async function getDatas() {
  try {
    
    const response = await fetch(docdatas);

    if (!response.ok) {
      if (response.status === 404) throw new Error('aucun fichier trouvé');
    }
  } catch (e) {
    console.log(e);
  }

  const response = await fetch(docdatas);
  const data = await response.json();

  return data;
}

const recipesArray = await getDatas();

console.log(recipesArray);
export { recipesArray };
