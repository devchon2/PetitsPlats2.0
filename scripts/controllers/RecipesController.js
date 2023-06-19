/* eslint-disable no-console */
/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-unresolved
import { recipesArray } from './datasController.js';

console.log('RecipesController loaded');
console.log('recipes', recipesArray);

const recipes = recipesArray;
console.log('test recipes split file', recipes);

const recipesIngredientRaw = recipes.map((element) => element.ingredients);
const recipesUstensilsRaw = recipes.map((element) => element.ustensils);
const recipesAppliancesRaw = recipes.map((element) => element.appliance);
console.log('tableau de listes des ingredients', recipesIngredientRaw);
console.log('tableau de la liste des ustensiles', recipesUstensilsRaw);
console.log("tableau de la liste d'electroménager", recipesAppliancesRaw);


