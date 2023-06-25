
import {
  IngredientsObject,
  AppliancesObject,
  UstensilesObject,
} from '../controllers/datasController.js';

import { Label } from './labels.js';

/**
 * Variables des éléments
 */
const filterIngredientsList = document.getElementById('ingredientsList');
const filterApplianceList = document.getElementById('appliancesList');
const filterUstensilsList = document.getElementById('ustensilesList');
const filtersBtn = document.querySelectorAll('.filterBtn');
const FullArray = [IngredientsObject, AppliancesObject, UstensilesObject];
const labelContainer = document.getElementById('labelsContainer');






/**
 * Écouteur d'événement pour les bouton des filtres
 */
filtersBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
        e.preventDefault()
        btn.classList.toggle('active')
        const { id } = btn
        displayFilter(id)
  })
})

/**
 * Fonction qui crée tous les filtres.
 */
function CreateAllFilters() {

  // Parcourt chaque élément de FullArray et appelle CreateFilter pour chaque élément.
  FullArray.forEach((element) => {
    CreateFilter(element);
  });
}

/**
 * Fonction qui crée un filtre pour un objet donné.
 * @param {Object} Obj - L'objet pour lequel on veut créer un filtre. ex: {'Ingredients': $IngredientsArray}
 */
function CreateFilter(Obj) {
  const Arrayname = Object.keys(Obj)[0];
  const Arrayfull = Object.values(Obj)[0].sort();
  Arrayfull.forEach((element) => {
    const filterElement = document.createElement('div');
    filterElement.id = element;
    filterElement.innerHTML = `${element}`;
    filterElement.classList.add('filterOption');

    filterElement.addEventListener('click', (e) => {
      const activeFilter = filterElement.classList.contains('active')

      
e.stopPropagation()
      if (!activeFilter) {
        filterElement.classList.toggle('active')
        const label = new Label(e.target.id)
        const labelDom = label.getDom()
        labelDom.classList.add(`label-${Arrayname}`)
        
        labelContainer.appendChild(labelDom)
      } 
      else if (activeFilter) {
          filterElement.classList.toggle('active')
          const labelDom = document.getElementById(`label-${e.target.id}`)
          labelDom.remove()
      }
    })
    if (Arrayname === 'Ingredients') {
      filterIngredientsList.appendChild(filterElement);
    } else if (Arrayname === 'Matériel') {
      filterApplianceList.appendChild(filterElement);
    } else if (Arrayname === 'Ustensiles') {
      filterUstensilsList.appendChild(filterElement);
    }
  })
    
}

function displayFilter(FilterID){
  const list = document.getElementById(`${FilterID}List`)  
  list.classList.toggle('hidden')
  list.classList.toggle('active')
}

export { CreateAllFilters, CreateFilter };
