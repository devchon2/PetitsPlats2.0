/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { recipesArray } from '../controllers/datasController.js';

import { Label } from './labels.js';

console.log('search.js loaded')

function Search(keyword){
  const updatedArray = []
     
     recipesArray.forEach(Recipes => {
      
      const { ingredients , name , description, id } = Recipes
      const ElementsToCheck = [name , description]
      console.log(ElementsToCheck)
      for (let i = 0;i <= ingredients.length-1; i+=1 ){
        while (ingredients.ingredient){
          ElementsToCheck.push(ingredients.ingredient)
        }
      }
      
      ElementsToCheck.forEach(element => { 
        if(element.match(keyword)){
          updatedArray.push(id)
          } 
          
          console.log(updatedArray)
        })

})
}

export { Search }
