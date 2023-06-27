
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
  btn.addEventListener('mouseover', () => {
    btn.parentElement.classList.add('active')
    btn.classList.toggle('active') // Ajoute ou supprime la classe active au bouton
        const btnID = btn.id // Récupère l'ID du bouton
        btn.querySelector('i').classList.toggle('fa-chevron-down')//
        btn.querySelector('i').classList.toggle('fa-chevron-up') // Change l'icône du bouton pour indiquer si la liste est ouverte ou fermée.
        ToggleList(btnID) 
  })
  btn.addEventListener('mouseout', () => {
    btn.parentElement.classList.remove('active')
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
    const filterName = element.toUpperCase().charAt(0) + element.slice(1);
    filterElement.id = `Filter-${filterName.replaceAll(' ', '-')}`
    filterElement.innerHTML = `${filterName}`;
    filterElement.classList.add('filterOption');

    // Écouteur d'événement Click pour chaque élément de filtre.
    filterElement.addEventListener('click', (e) => {
      const activeFilter = filterElement.classList.contains('active') // Récupère  l'élément de filtre en état actif
      const activeBtn = document.querySelector('.filterOption.active')

      if (!activeFilter) {
        filterElement.classList.toggle('active')
        const label = new Label(filterName)
        const labelDom = label.getDom()
        label.addListener()
        labelDom.classList.add(`label-${Arrayname}`)
        filterElement.innerHTML = `<p class='filterName'>${filterName}</p> <i class="fa-solid fa-circle-xmark filter-icon"></i>`	
        
        labelContainer.appendChild(labelDom)
      } else if (activeFilter && e.target.classList.contains('filter-icon')){
          filterElement.classList.toggle('active')
          filterElement.innerHTML = `${filterName}  `
          const labelDom = document.getElementById(`label-${filterName}`)
          labelDom.remove()
      } else if (activeFilter && e.target.contains('.filter:not(.active)')) {
        if(activeBtn){
          const activeList = document.querySelector('.filterList.active');
          activeList.classList.remove('active');
          activeList.classList.add('hidden');
          activeBtn.classList.remove('active');
          activeBtn.querySelector('i').classList.remove('fa-chevron-up');
          activeBtn.querySelector('i').classList.add('fa-chevron-down');
          filterElement.classList.toggle('active')
          filterElement.innerHTML = `${filterName}  `
          const labelDom = document.getElementById(`label-${filterName}`)
          labelDom.remove()
      }}
    })
    
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
        activeBtn.querySelector('i').classList.remove('fa-chevron-up');
        activeBtn.querySelector('i').classList.add('fa-chevron-down');
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
