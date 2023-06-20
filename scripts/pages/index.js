/* eslint-disable no-console */
/* eslint-disable import/extensions */
import {  Recipe } from '../controllers/RecipesController.js';
import { recipesArray } from '../controllers/datasController.js';
import { CreateAllFilters, CreateFilter } from '../utils/utils.js';


console.log('index.js loaded');
const recipeContainer = document.getElementById('RecipesCardsContainer');




function init() {
    for (let i = 0; i < recipesArray.length -1; i += 1) {
        const recipe = new Recipe(
            recipesArray[i].appliance,
            recipesArray[i].description,
            recipesArray[i].id,
            recipesArray[i].image,
            recipesArray[i].ingredients,
            recipesArray[i].name,
            recipesArray[i].servings,
            recipesArray[i].time,
            recipesArray[i].ustensils,
        );
        
    
        const recipeCard =  recipe.getCard();
        recipeContainer.appendChild(recipeCard);
        
        
        
            

    }
}
init();