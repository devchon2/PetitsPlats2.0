/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */

import { appliancesObject, ingredientsObject, recipesArray, ustensilesObject } from '../controllers/datasController.js';
import { createAllFilters, createFilter } from './filters.js';

import { Label } from './labels.js';

console.log('search.js chargé');

const NewappliancesArray = [];
const NewIngredientsArray = [];
const NewUstensilesArray = [];

/**
 * Recherche les recettes correspondant à un mot-clé donné.
 * @param {string} keyword - Le mot-clé à rechercher
 * @returns {Array} - Un tableau contenant les recettes mises à jour et les filtres mis à jour
 */
function Search(keyword) {
  const updatedArray = []
  recipesArray.forEach(recipe => {
const ElementsToCheck = []

    const {  description, ingredients, name } = recipe;
    ElementsToCheck.push(description, name)
    const [ ingredient ] = ingredients 
         console.log('ingredient', ingredient.ingredient);
      ElementsToCheck.push(ingredient.ingredient)
    

    ElementsToCheck.forEach(element => {
      console.log('element', element);
      if (element.match(keyword) && !updatedArray.include(recipe)) {
        updatedArray.push(recipe)
      }
    })
  })

      updatedArray.forEach(recipe => {
        const { appliance, ingredients, ustensils } = recipe;
        if (!NewappliancesArray.includes(appliance)){
          NewappliancesArray.push(appliance)
        }
        ingredients.forEach(element => {
          if (!NewIngredientsArray.includes(element.ingredient)){
          NewIngredientsArray.push(element.ingredient)
        }})
        ustensils.forEach(element => {
          if (!NewUstensilesArray.includes(element)){
          NewUstensilesArray.push(element)
        }
      })
      })

  const UpdatedFilterApplicances = { 'appliances': NewappliancesArray };
  const UpdatedFilterIngredients = { 'ingredients': NewIngredientsArray };
  const UpdatedFilterUstensiles = { 'ustensils': NewUstensilesArray };
  const UpdatedElement = [UpdatedFilterIngredients, UpdatedFilterApplicances, UpdatedFilterUstensiles];

  return [updatedArray, UpdatedElement];
}

export { Search };
