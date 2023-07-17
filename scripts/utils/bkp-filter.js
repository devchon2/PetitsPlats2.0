
import { SearchListInput } from './search.js';


class Filter {
  constructor(id, list) {
    console.log('Filter chargé');
    console.log('id', id);
    console.log('list', list);
    this.id = id;
    this.filterName = this.id.toUpperCase().charAt(0) + this.id.slice(1);
    this.filterElement = document.createElement('div');
    this.NormalizedName = `${this.id.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replaceAll(' ', '')}`;
    this.html = `<div class="filterOption" id="Filter${this.NormalizedName}">
                    <span >${this.filterName}</span>
                    <i class="hidden fa-solid fa-xmark filter-icon"></i>
                </div>`;
    this.filterIcon = this.filterElement.querySelector('.filter-icon');
    this.filterIcon = `<i class="hidden fa-solid fa-xmark filter-icon"></i>`;
    this.filterElement.innerHTML = `${this.html}`
    this.list = list.id;

    
    
    this.filtersContainer = document.querySelector('#filtersContainer');
    this.addListener();
  }

 getDom() {
  
    return this.filterElement;
  }

  addListener() {
    this.filterElement.addEventListener('click', (e) => {
      e.stopPropagation();
      const activeFilter = this.filterElement.classList.contains('active');  const {list } = this;
      const activeBtn = document.querySelector('.filter.active');

      if (!activeFilter) {
        this.filterElement.classList.add('active');
        this.filterElement.innerHTML += this.filterIcon;
        
      ;

      } else if (e.target.classList.contains('filter-icon')) {
        e.stopPropagation();
        this.filterElement.classList.remove('active');
        this.filterElement.innerHTML = `${this.filterName}  `;
        const filterDom = document.getElementById(`filter-${this.filterName}`);
        filterDom.remove();
      } else {
        toggleList(activeBtn.id);
        this.filterElement.innerHTML = `${this.filterName}  `;
        const filterDom = document.getElementById(`${this.NormalizedId}`);
        filterDom.remove();
      }
    });

    // Écouteur d'événement Hover pour chaque élément de filtre.
    this.filterElement.addEventListener('mouseover', () => {
      this.filterElement.classList.add('hovered');
    });

    // Écouteur d'événement HoverOut pour chaque élément de filtre.
    this.filterElement.addEventListener('mouseout', () => {
      this.filterElement.classList.remove('hovered');
    });
  }

 
}
const filtersBtn = document.querySelectorAll('.filter');
filtersBtn.forEach((btn) => {
  const input = btn.querySelector('input');
  const btnID = btn.id; // Récupère l'ID du bouton

  console.log('btnID', btnID);
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
 * @param {Array} Array - Le tableau contenant les filtres à créer
 */
function GetAllFilters(Array) {
  console.log('GetAllFilters chargé');
  console.log('Array entries GetAllFilters', Array);
  // Parcourt chaque élément de fullArray et appelle GetFilters pour chaque élément.
  Array.forEach((obj) => {
    const arrayName = Object.keys(obj)[0];
    const arrayElement = Object.values(obj)[0].sort((a, b) => a.localeCompare(b));

    if (arrayName === 'ingredients') {
      const OldElements = document.querySelectorAll('#ingredientsList .filterOption');
      OldElements.forEach((Oldelement) => {
        Oldelement.remove();
      });
      GetFilters({ 'ingredients': arrayElement });

      // GetFilters({ 'ingredients': ${arrayElement} });
    } else if (arrayName === 'appliances') {
      const OldElements = document.querySelectorAll('#appliancesList .filterOption');
      OldElements.forEach((Oldelement) => {
        Oldelement.remove();
      });
      GetFilters({ 'appliances': arrayElement });
    } else if (arrayName === 'ustensils') {
      const OldElements = document.querySelectorAll('#ustensilsList .filterOption');
      OldElements.forEach((Oldelement) => {
        Oldelement.remove();
      });
      GetFilters({ 'ustensils': arrayElement });
    }
  });
  
}

/** Fonction qui crée un filtre pour un objet donné.
 * @param {Object} Obj - L'objet pour lequel on veut créer un filtre
 */
function GetFilters(Obj) {
  const arrayName = Object.keys(Obj)[0];
  const list = document.getElementById(`${arrayName}List`);
const arrayFull = Object.values(Obj)[0].sort((a, b) => a.localeCompare(b));
  
  arrayFull.forEach((element) => {
    const filterElement = new Filter(element,list);
    console.log('filterElement', filterElement);
    const filter = filterElement.getDom();
    console.log('filter', filter);
    
    list.appendChild(filter);
  });
}


/** Fonction qui affiche ou cache la liste de filtre.
 * @param { string } btnId - Le nom du bouton de filtre
 */
function toggleList(btnId) {

  const List = document.getElementById(`${btnId.replace('Filter', '')}List`);
  const btn = document.getElementById(`${btnId.replace('Filter', '')}`);
  const zone = document.getElementById(`${btnId}`);

  console.log('btnId', btnId);
  console.log('list', List);
  console.log('btn', btn);

  List.classList.toggle('active');
  List.classList.toggle('hidden');
  btn.classList.toggle('active');
  zone.classList.toggle('active');
  btn.querySelector('i').classList.toggle('fa-chevron-down');
  btn.querySelector('i').classList.toggle('fa-chevron-up');
}

function UpdateFilters(updatedArray) {

  const NewappliancesArray = []
  const NewIngredientsArray = []
  const NewUstensilesArray = []

  for (let i = 0; i < updatedArray.length; i += 1) {
    const { appliance, ingredients, ustensils } = updatedArray[i];
    if (!NewappliancesArray.includes(appliance)) {
      NewappliancesArray.push(appliance)
    }
    for (let j = 0; j < ingredients.length; j += 1) {
      const element = ingredients[j];
      if (!NewIngredientsArray.includes(element.ingredient)) {
        NewIngredientsArray.push(element.ingredient)
      }
    }
    for (let k = 0; k < ustensils.length; k += 1) {
      const element = ustensils[k];
      if (!NewUstensilesArray.includes(element)) {
        NewUstensilesArray.push(element)
      }
    }
  }

  const UpdatedFilterApplicances = { 'appliances': NewappliancesArray }
  const UpdatedFilterIngredients = { 'ingredients': NewIngredientsArray }
  const UpdatedFilterUstensiles = { 'ustensils': NewUstensilesArray }
  const UpdatedElement = [UpdatedFilterIngredients, UpdatedFilterApplicances, UpdatedFilterUstensiles]

  return UpdatedElement
}


export { GetAllFilters, UpdateFilters, GetFilters };