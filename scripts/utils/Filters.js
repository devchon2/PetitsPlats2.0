
import { IngredientsObject, AppliancesObject, UstensilesObject } from '../controllers/datasController.js';
import { Label } from './labels.js';

/** Variables des éléments
 * 
 */
const filterIngredientsList = document.getElementById('ingredientsList');
const filterApplianceList = document.getElementById('appliancesList');
const filterUstensilsList = document.getElementById('ustensilesList');
const filtersBtn = document.querySelectorAll('.filterBtn');
const FullArray = [IngredientsObject, AppliancesObject, UstensilesObject];
const labelContainer = document.getElementById('labelsContainer');


/** Écouteur d'événement pour les bouton des filtres
 * 
 */
filtersBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation()
    btn.classList.toggle('active') // Ajoute ou supprime la classe active au bouton
        const btnID = btn.id // Récupère l'ID du bouton
        btn.querySelector('i').classList.toggle('fa-chevron-down')//
        btn.querySelector('i').classList.toggle('fa-chevron-up') // Change l'icône du bouton pour indiquer si la liste est ouverte ou fermée.
        ToggleList(btnID) 
  })
})
  
/** Fonction qui crée tous les filtres.
 *
 */
function CreateAllFilters() {
  FullArray.forEach((element) => {  // Parcourt chaque élément de FullArray et appelle CreateFilter pour chaque élément.
    CreateFilter(element);
  });
}

/** Fonction qui crée un filtre pour un objet donné.
 * @param {Object} Obj - L'objet pour lequel on veut créer un filtre. ex: {'Ingredients': $IngredientsArray}
 *
 */
function CreateFilter(Obj) {
  const Arrayname = Object.keys(Obj)[0];
  const Arrayfull = Object.values(Obj)[0].sort();
  
  Arrayfull.forEach((element) => {// Parcourt chaque élément du tableau et crée un élément HTML pour chaque élément.
    
    const filterElement = document.createElement('div');
    filterElement.id = element;
    filterElement.innerHTML = `${element}`;
    filterElement.classList.add('filterOption');

    // Écouteur d'événement Click pour chaque élément de filtre.
    filterElement.addEventListener('click', (e) => {
      const activeFilter = filterElement.classList.contains('active') // Récupère  l'élément de filtre en état actif
      e.stopPropagation()

      if (!activeFilter) {
        filterElement.classList.toggle('active')
        const label = new Label(filterElement.id)
        const labelDom = label.getDom()
        labelDom.classList.add(`label-${Arrayname}`)
        filterElement.innerHTML = `<p class='filterName'>${element}</p> <i class="fa-solid fa-circle-xmark filter-icon"></i>`	
        
        labelContainer.appendChild(labelDom)
      } else if (activeFilter && e.target.classList.contains('filter-icon')){
          filterElement.classList.toggle('active')
          filterElement.innerHTML = `${element}`
          const labelDom = document.getElementById(`label-${filterElement.id}`)
          labelDom.remove()
      } 
     
      });
    
    // Écouteur d'événement Hover pour chaque élément de filtre.
    filterElement.addEventListener('mouseover', () => {
      filterElement.classList.add('hovered')
    })

    // Écouteur d'événement HoverOut pour chaque élément de filtre.
    filterElement.addEventListener('mouseout', () => {
      filterElement.classList.remove('hovered')
    })
  
    window.addEventListener('click', (e) => {
      e.stopPropagation()
      const activeList = document.querySelector('.filterList.active');
      const activeBtn = document.querySelector('.filterBtn.active');
      
      if (activeList) {
        activeList.classList.remove('active');
        activeList.classList.add('hidden');
        activeBtn.classList.remove('active');
        }
      })
    

    // Ajoute l'élément de filtre à la bonne liste.
    if (Arrayname === 'Ingredients') {
      filterIngredientsList.appendChild(filterElement);
    } else if (Arrayname === 'Matériel') {
      filterApplianceList.appendChild(filterElement);
    } else if (Arrayname === 'Ustensiles') {
      filterUstensilsList.appendChild(filterElement);
    }
  })
}
    


/** Fonction qui affiche ou cache la liste de filtre.
 * @param { string } FilterID - Le nom du bouton de filtre. ex: 'ingredientsBtn'
 */
function ToggleList(FilterID){
  const list = document.getElementById(`${FilterID}List`)  
  
  list.classList.toggle('active')
  list.classList.toggle('hidden')
}


export { CreateAllFilters, CreateFilter };
