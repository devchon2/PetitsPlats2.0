/* eslint-disable import/no-cycle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */

// Importation des classes et fonctions nécessaires depuis d'autres fichiers
import { Label } from './labels.js';
import { SearchFromFilter, SearchListInput } from './search.js';
import { UpdateRecipes, Normalized } from '../controllers/RecipesController.js';

/** Classe Filter */
class Filter {

  constructor(name, type) {

    this.NAME = name;
    this.TYPE = type;
    this.RAWNAME = this.NAME.charAt(0).toUpperCase() + this.NAME.slice(1);
    this.NORMALIZED = Normalized(this.RAWNAME);
    this.ID = `Filter-${this.NORMALIZED}`;
    this.LABEL = new Label(this.NAME, this.TYPE);
    this.LABELID = `label-${this.NORMALIZED}`;
    this.ELEMENT = document.createElement('div');
    this.LIST = document.getElementById(`${this.TYPE}List`);
    this.ACTIVE = `<p class='FilterName m-0 '>${this.RAWNAME}</p><i class="fa-solid fa-xmark filter-Icon ms-4 me-1 "></i>`
    this.INACTIVE = `<p class='FilterName m-0 '>${this.RAWNAME}</p><i class="fa-solid fa-xmark filter-Icon ms-4 me-1 d-none"></i>`
    this.ICON = this.ELEMENT.querySelector('.filter-Icon');

    this.SetFilter();
  }

  SetFilter() {

    this.ELEMENT.setAttribute('id', this.ID);
    this.ELEMENT.setAttribute('data-Normalized', this.NORMALIZED);
    this.ELEMENT.setAttribute('data-name', this.RAWNAME);
    this.ELEMENT.setAttribute('data-type', this.TYPE);
    this.ELEMENT.innerHTML = this.INACTIVE;
    this.ELEMENT.classList.add('filterOption', 'd-flex', 'align-items-center', 'justify-content-between', 'px-2', 'py-2');
    

    this.AddListener();
    this.AddToList();
  }

  SetActive() {

    const labelDom = this.LABEL.getDom();
    labelContainer.appendChild(labelDom);
    this.ELEMENT.classList.add('active');
    this.ELEMENT.innerHTML = this.ACTIVE;
    SearchAndUpdate(this.NAME, this.TYPE);
  }

  SetInactive() {
     
    this.LABEL.removeDom();
    this.ELEMENT.classList.toggle('active');
    this.ELEMENT.innerHTML = this.INACTIVE;
    
    //     SearchFromDeleteLabel(this.NAME, this.TYPE);
  }

  AddListener() {
    this.ELEMENT.addEventListener('click', (e) => {
      e.stopPropagation();
      this.ISACTIVE = this.ELEMENT.classList.contains('active');

      if (!this.ISACTIVE) {
        this.SetActive();
      } 
      if (e.target.classList.contains('filter-Icon') && this.ISACTIVE) {
        this.SetInactive();
      }
    });

    this.ELEMENT.addEventListener('mouseover', () => {
      this.ELEMENT.classList.add('hovered');
    });

    this.ELEMENT.addEventListener('mouseout', () => {
      this.ELEMENT.classList.remove('hovered');
    });
  }

  AddToList() {
    if (this.TYPE === 'ingredients') {
      filterIngredientsList.appendChild(this.ELEMENT);
    } else if (this.TYPE === 'appliances') {
      filterApplianceList.appendChild(this.ELEMENT);
    } else if (this.TYPE === 'ustensils') {
      filterUstensilsList.appendChild(this.ELEMENT);
    }
  }
}

// Sélection des éléments HTML à utiliser pour la gestion des filtres
const filterIngredientsList = document.getElementById('ingredientsList');
const filterApplianceList = document.getElementById('appliancesList');
const filterUstensilsList = document.getElementById('ustensilsList');
const filterZones = document.querySelectorAll('.filterBtn');
const labelContainer = document.getElementById('labelsContainer');
const filtersInput = document.querySelectorAll('.inputFilterBtn');

filtersInput.forEach((input) => {
  
});

filterZones.forEach((btn) => { /** Écouteur d'événement pour les boutons des filtres */

  const input = btn.querySelector('input');
  const btnID = btn.id; // Récupère l'ID du bouton
  const list = btn.querySelector('.filterList'); // Récupère la liste de filtres associée au bouton

  btn.addEventListener('click', (e) => {
    
    if (input.contains(e.target)) {
      e.stopImmediatePropagation();
      input.addEventListener('keyup', () => {
        const filtersArray = Array.from(list.querySelectorAll('.filterOption'));
        SearchListInput(filtersArray, input.value);
      });
    
    } else {
      e.stopPropagation();
      toggleList(btnID);
    
    }
  });
});

/** Écouteur d'événement de clic en dehors de la zone active */
document.body.addEventListener('click', (e2) => {
  const activeFilter = document.querySelector('.filter.active');
  const inactiveFilters = document.querySelectorAll('.filter:not(.active)');
  const activeBtnID = activeFilter?.id.replace('Filter', '');

  if (activeFilter) {
    if (e2.target.id !== activeFilter.id) {
      // Si l'élément cliqué n'est pas le filtre actif
      toggleList(activeBtnID); // Ferme le filtre actif
    }
    if (
      e2.target.classList.contains('filter') &&
      !e2.target.classList.contains('active')
    ) {
      // Si l'élément cliqué est un filtre
      toggleList(activeBtnID); // Ferme le filtre actif
      toggleList(e2.target.id); // Ouvre le filtre inactif sur lequel l'utilisateur a cliqué
    }
  }
});

function SearchAndUpdate(name, type) {
  UpdateRecipes(SearchFromFilter(name,type,));
  UpdateFilters(SearchFromFilter(name,type,));
}

function RestoreActive() {
  const CurrentLabels = document.querySelectorAll('.labels');
  const CurrentFilters = document.querySelectorAll('.filterOption');

  if (CurrentLabels.length > 0) {
    for (const CurrentLabel of CurrentLabels) {
      const NormalizedLabel = CurrentLabel.getAttribute('data-normalized');

      for (const CurrentFilter of CurrentFilters) {
        const NormalizedFilter = CurrentFilter.getAttribute('data-normalized');
        const RAWNAME = CurrentFilter.getAttribute('data-name');

        if (NormalizedLabel === NormalizedFilter) {
          CurrentFilter.innerHTML = `<p class='FilterName m-0 '>${RAWNAME}</p><i class="fa-solid fa-xmark filter-Icon ms-4 me-1 "></i>`;
          CurrentFilter.classList.add('active');
        }
      }
    }
  }}

  /** Fonction qui crée tous les filtres.
   * @param {Array} Array - Le tableau contenant les filtres à créer
   */
  function GetAllFilters(Array) { // Parcourt chaque élément de fullArray et appelle GetFilters pour chaque élément.

    Array.forEach((obj) => {
      const arrayName = Object.keys(obj)[0];
      const arrayFilter = Object.values(obj)[0].sort((a, b) => a.localeCompare(b));

      const list = document.getElementById(`${arrayName}List`);
      const oldActualFilters = list.querySelectorAll('.filterOption');
      oldActualFilters.forEach((oldActualFilter) => { oldActualFilter.remove(); });
      
      GetFilters({ [arrayName]: arrayFilter });
    });
  }

  /** Fonction qui crée un filtre pour un objet donné.
   * @param {Object} Obj - L'objet pour lequel on veut créer un filtre
   */
  function GetFilters(Obj) {
    const arrayName = Object.keys(Obj)[0];
    const arrayFull = Object.values(Obj)[0].sort((a, b) => a.localeCompare(b));

    arrayFull.forEach((ActualFilter) => { // Parcourt chaque élément du tableau et crée un élément HTML pour chaque élément.
      const filter = new Filter(ActualFilter, arrayName);
    });
  }

  /** Fonction qui affiche ou cache la liste de filtre.
   * @param {string} FilterID - Le nom du bouton de filtre
   */
  function toggleList(FilterID) {
    const list = document.getElementById(`${FilterID}List`);
    const btn = document.getElementById(`${FilterID}`);
    const zone = document.getElementById(`${FilterID}Filter`);
    const input = list.firstElementChild.querySelector('input');

    list.classList.toggle('active');
    list.classList.toggle('d-none');
    btn.classList.toggle('rounded-bottom-4');
    btn.classList.toggle('active');
    zone.classList.toggle('active');
    btn.querySelector('i').classList.toggle('fa-chevron-down');
    btn.querySelector('i').classList.toggle('fa-chevron-up');
    if (list.classList.contains('active')) {
      input.value = '';
    }
  }

  /** Fonction qui met à jour les filtres en fonction des recettes filtrées.
   * @param {Array} UpdatedFilter - Le tableau contenant les recettes filtrées
   * @returns {Array} - Le tableau mis à jour des éléments de filtre
   */
  function UpdateFilters(UpdatedFilter) {
    const NewappliancesArray = [];
    const NewIngredientsArray = [];
    const NewUstensilesArray = [];
    for (const recipe of UpdatedFilter) {
      const { appliance, ingredients, ustensils } = recipe;
      if (!NewappliancesArray.includes(appliance)) {
        NewappliancesArray.push(appliance);
      }
      for (const ingredient of ingredients) {
        if (!NewIngredientsArray.includes(ingredient.ingredient)) {
          NewIngredientsArray.push(ingredient.ingredient);
        }
      }
      for (const ustensil of ustensils) {
        if (!NewUstensilesArray.includes(ustensil)) {
          NewUstensilesArray.push(ustensil);
        }
      }
    }

    const finalAppliancesArray = Array.from(new Set(NewappliancesArray));
    const finalIngredientsArray = Array.from(new Set(NewIngredientsArray));
    const finalUstensilesArray = Array.from(new Set(NewUstensilesArray));

    const UpdatedFilterApplicances = { appliances: finalAppliancesArray };
    const UpdatedFilterIngredients = { ingredients: finalIngredientsArray };
    const UpdatedFilterUstensiles = { ustensils: finalUstensilesArray };
    const UpdatedActualFilter = [UpdatedFilterIngredients, UpdatedFilterApplicances, UpdatedFilterUstensiles];

    GetAllFilters(UpdatedActualFilter);
    RestoreActive();  
  }

  // Exportation des fonctions pour les rendre disponibles dans d'autres fichiers
  export { GetAllFilters, GetFilters, UpdateFilters, SearchAndUpdate };
