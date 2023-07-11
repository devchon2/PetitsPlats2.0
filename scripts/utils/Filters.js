

import { Label } from './labels.js';

/** Variables des éléments
 *
 */
const filterIngredientsList = document.getElementById('ingredientsList');
const filterApplianceList = document.getElementById('appliancesList');
const filterUstensilsList = document.getElementById('ustensilsList');
const filtersBtn = document.querySelectorAll('.filterBtn');
const labelContainer = document.getElementById('labelsContainer');

/** Écouteur d'événement pour les bouton des filtres
 *
 */
filtersBtn.forEach((btn) => {
  const input = btn.querySelector('input');
  const btnID = btn.id; // Récupère l'ID du bouton

  btn.addEventListener('click', (e) => {
    if (input.contains(e.target)) {
      e.stopImmediatePropagation();
    } else {
      e.stopPropagation();
      toggleList(btnID);
    }

    /** Écouteur d'événement de clic en dehors de la zone active */
    document.body.addEventListener('click', (e2) => {
      const activeFilter = document.querySelector('.filter.active');
      const activeBtnID = activeFilter?.id.replace('Filter', '');

      if (activeFilter) {
        if (
          e2.target.classList.contains('filter') &&
          !e2.target.classList.contains('active')
        ) {
          toggleList(e2.target.id);
          toggleList(activeBtnID);
        } else if (activeFilter) {
          toggleList(activeBtnID);
        }
      }
    });
  });
});

/** Fonction qui crée tous les filtres.
 *
 */
function createAllFilters(Array) {   
  console.log('createAllFilters loaded')
  console.log('Array entries createallfilters', Array) 
  // Parcourt chaque élément de fullArray et appelle CreateFilter pour chaque élément.
    Array.forEach((obj) => {
      const arrayName = Object.keys(obj)[0];
      const arrayElement = Object.values(obj)[0].sort((a, b) => a.localeCompare(b));
    if (arrayName === 'ingredients') {
      const OldElements = document.querySelectorAll('#ingredientsList .filterOption');
      OldElements.forEach((Oldelement) => {
        Oldelement.remove();
      });
    //  console.log( `createFilter({ 'ingredients': ${arrayElement} })` );      

    
    } else if (arrayName === 'appliances') {
      
      const OldElements = document.querySelectorAll('#appliancesList .filterOption');
      OldElements.forEach((Oldelement) => {
        Oldelement.remove();
      });
      createFilter({ appliances: arrayElement});

    } else if (arrayName === 'ustensils') {
      const OldElements = document.querySelectorAll('#ustensilsList .filterOption');
      OldElements.forEach((Oldelement) => {
        Oldelement.remove();
      });
         
      createFilter({ ustensils: arrayElement});
    }

  
    
    
    
  });
}

/** Fonction qui crée un filtre pour un objet donné.
 * @param {Object} Obj - L'objet pour lequel on veut créer un filtre. ex: {'Ingredients': $IngredientsArray}
 *
 */
function createFilter(Obj) {
  const arrayName = Object.keys(Obj)[0];
  const arrayFull = Object.values(Obj)[0].sort((a, b) => a.localeCompare(b));
  
  arrayFull.forEach((element) => {
    // Parcourt chaque élément du tableau et crée un élément HTML pour chaque élément.

    const filterElement = document.createElement('div');
    const filterarrayName = element.toUpperCase().charAt(0) + element.slice(1);
    filterElement.id = `Filter-${filterarrayName.replaceAll(' ', '')}`;
    filterElement.innerHTML = `${filterarrayName}`;
    filterElement.classList.add('filterOption');

    // Écouteur d'événement Click pour chaque élément de filtre.
    filterElement.addEventListener('click', (e) => {
      e.stopPropagation();
      const activeFilter = filterElement.classList.contains('active'); // Récupère  l'élément de filtre en état actif
      const activeBtn = document.querySelector('.filter.active');

      if (!activeFilter) {
        filterElement.classList.toggle('active');
        const label = new Label(filterarrayName);
        const labelDom = label.getDom();
        label.addListener();
        labelDom.classList.add(`label-${arrayName}`);
        filterElement.innerHTML = `<p class='filterarrayName'>${filterarrayName}</p> <i class="fa-solid fa-circle-xmark filter-icon"></i>`;

        labelContainer.appendChild(labelDom);
      } else if (e.target.classList.contains('filter-icon')) {
        e.stopPropagation();
        filterElement.classList.remove('active');
        filterElement.innerHTML = `${filterarrayName}  `;
        const labelDom = document.getElementById(`label-${filterarrayName}`);
        labelDom.remove();
      } else {
        toggleList(activeBtn.id);
        filterElement.innerHTML = `${filterarrayName}  `;
        const labelDom = document.getElementById(`label-${filterarrayName}`);
        labelDom.remove();
      }
    });
    // Écouteur d'événement Hover pour chaque élément de filtre.
    filterElement.addEventListener('mouseover', () => {
      filterElement.classList.add('hovered');
    });

    // Écouteur d'événement HoverOut pour chaque élément de filtre.
    filterElement.addEventListener('mouseout', () => {
      filterElement.classList.remove('hovered');
    });

    // Ajoute l'élément de filtre à la bonne liste.
    if (arrayName === 'ingredients') {
      
      filterIngredientsList.appendChild(filterElement);
    } else if (arrayName === 'appliances') {
      filterApplianceList.appendChild(filterElement);
    } else if (arrayName === 'ustensils') {
      filterUstensilsList.appendChild(filterElement);
    }
  });
}

/** Fonction qui affiche ou cache la liste de filtre.
 * @param { string } FilterID - Le nom du bouton de filtre. ex: 'ingredientsBtn'
 */
function toggleList(FilterID) {
  const list = document.getElementById(`${FilterID}List`);
  const btn = document.getElementById(`${FilterID}`);
  const zone = document.getElementById(`${FilterID}Filter`);

  list.classList.toggle('active');
  list.classList.toggle('hidden');
  btn.classList.toggle('active');
  zone.classList.toggle('active');
  btn.querySelector('i').classList.toggle('fa-chevron-down');
  btn.querySelector('i').classList.toggle('fa-chevron-up');
}

export { createAllFilters, createFilter };
