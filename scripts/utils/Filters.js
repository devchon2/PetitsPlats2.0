/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

import {
  IngredientsObject,
  AppliancesObject,
  UstensilesObject,
} from '../controllers/datasController.js';

import {
  Label
} from './labels.js'

/**
 * Variables des éléments
 */
const filterIngredientsList = document.getElementById('ingredientsList');
const filterApplianceList = document.getElementById('appliancesList');
const filterUstensilsList = document.getElementById('ustensilesList');
const filtersBtn = document.querySelectorAll('.filterBtn');
const filtersInputs = document.querySelectorAll('.filtersInput');
const filterList = document.querySelectorAll('filterList')

/**
 * Écouteurs d'événements pour les entrées des filtres
 */
filtersInputs.forEach((input) => {
  console.log(input)
})



/**
 * Écouteur d'événement pour les bouton des filtres
 */
filtersBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation()
        const { target } = e
        const { id } = target
        const  btnID  = btn.id
        const list = target.lastElementChild
        console.log('bouton :', btn,
        'id :', id,'target :', target,'list :', list,'btnID :', btnID)
          clickFilter(id)
      })})


/**
 * Fonction qui crée tous les filtres.
 */
function CreateAllFilters() {
  const FullArray = [IngredientsObject, AppliancesObject, UstensilesObject];

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
    const optionElement = document.createElement('div');
    optionElement.id = element;
    optionElement.innerHTML = `${element}`;
    optionElement.classList.add('filter');

    if (Arrayname === 'Ingredients') {
      filterIngredientsList.appendChild(optionElement);
    } else if (Arrayname === 'Matériel') {
      filterApplianceList.appendChild(optionElement);
    } else if (Arrayname === 'Ustensiles') {
      filterUstensilsList.appendChild(optionElement);
    }

    optionElement.addEventListener('click', (e) => {
      e.stopPropagation()

    })
  });
}

function clickFilter(FilterID){
  const list = document.getElementById(`${FilterID}List`)  
  list.classList.toggle('hidden')
  list.classList.toggle('active')
  const filterElements = document.querySelectorAll('.filterList .filter')
  const elements = Array.from(filterElements)
  elements.shift()
  elements.forEach((element) => {
    element.addEventListener('click', (filter) =>{
      filter.stopPropagation()
      const { id } = element
      console.log(id)
      const label = new Label(id)
      const labelDom = label.getDom()
      console.log(labelDom)
      const labelContainer = document.getElementById('labelsContainer')
      labelContainer.appendChild(labelDom)
    })
  })
}

function UpdateFilter(filter){
  const {label} = document.querySelectorAll('.labels')
  const input = document.getElementById('searchInput')
  if (!filter.id === label.id || !input.value.match(filter.id))  {
    filter.classList.add('hidden')
  }

}
    



// Exporte les fonctions pour pouvoir les utiliser dans d'autres fichiers.
export { CreateAllFilters, CreateFilter };
