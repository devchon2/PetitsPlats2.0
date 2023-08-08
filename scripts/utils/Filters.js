/* eslint-disable import/no-cycle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */

// Importation des classes et fonctions nécessaires depuis d'autres fichiers
import { Label } from './labels.js';
import { SearchFromDeleteLabel, SearchFromFilter, SearchListInput } from './search.js';
import { UpdateRecipes, Normalized } from '../controllers/RecipesController.js';

// Sélection des éléments HTML à utiliser pour la gestion des filtres
const filterIngredientsList = document.getElementById('ingredientsList');
const filterApplianceList = document.getElementById('appliancesList');
const filterUstensilsList = document.getElementById('ustensilsList');
const filterZones = document.querySelectorAll('.filterBtn');

/** Classe Filter */
class Filter {

  constructor(name, type) {

    this.NAME = name;
    this.TYPE = type;
    this.RAWNAME = this.NAME.charAt(0).toUpperCase() + this.NAME.slice(1);
    this.NORMALIZED = Normalized(this.RAWNAME);
    this.ID = `Filter-${this.NORMALIZED}`;
    this.SetFilter();
  }

  SetFilter() {// Crée un élément HTML pour le filtre

    this.LABELID = `label-${this.NORMALIZED}`;
    this.ELEMENT = document.createElement('div');
    this.LIST = document.getElementById(`${this.TYPE}List`);
    this.ELEMENT.setAttribute('id', this.ID);
    this.ELEMENT.setAttribute('data-Normalized', this.NORMALIZED);
    this.ELEMENT.setAttribute('data-name', this.RAWNAME);
    this.ELEMENT.setAttribute('data-type', this.TYPE);
    this.ACTIVE = `<p class='FilterName m-0 '>${this.RAWNAME}</p><i class=" fa-solid fa-xmark filter-Icon ms-4 me-1 "></i>`
    this.INACTIVE = `<p class='FilterName m-0 '>${this.RAWNAME}</p><i class="fa-solid fa-xmark filter-Icon ms-4 me-1 d-none"></i>`
    this.HOVERED = `<p class='FilterName m-0 '>${this.RAWNAME}</p><i class="fa-solid fa-xmark filter-Icon ms-4 me-1 d-none"></i>`
    this.ELEMENT.classList.add('filterOption', 'd-flex', 'align-items-center', 'justify-content-between', 'px-2', 'py-2');
    this.ELEMENT.innerHTML = this.INACTIVE;
    this.ICON = this.ELEMENT.querySelector('.filter-Icon');
    this.AddListener();
    this.AddToList();

  }

  SetActive() {// Active le filtre
    this.ELEMENT.classList.add('active');
    this.ELEMENT.innerHTML = this.ACTIVE;
    this.AddLabel();

  }

  SetInactive() {// Désactive le filtre
    this.ELEMENT.classList.remove('active');
    this.ELEMENT.innerHTML = this.INACTIVE;
    this.RemoveLabel();
  }

  SetHovered() {// Ajoute un écouteur d'événement pour le survol du filtre
    if (!this.ISACTIVE) {
      this.ELEMENT.addEventListener('mouseover', () => {
        this.ELEMENT.classList.add('hovered');
      });

      this.ELEMENT.addEventListener('mouseout', () => {
        this.ELEMENT.classList.remove('hovered');

      });
    };
  }

  SetClick() {// Ajoute un écouteur d'événement pour le clic sur le filtre
      this.ELEMENT.addEventListener('click', (e) => {
        e.stopPropagation();
        this.ISACTIVE = this.ELEMENT.classList.contains('active');
  
        if (!this.ISACTIVE) {
          this.SetActive();
          SearchAndUpdate(this.NAME, this.TYPE);
  
        } else if (this.ISACTIVE && e.target.classList.contains('filter-Icon')) {
          this.SetInactive();
          SearchFromDeleteLabel(this.NAME, this.TYPE);
        }
      });
  }  
  
  AddLabel() {
    const labelToAdd = new Label(this.NAME, this.TYPE);
    labelToAdd.SetLabel();
    labelToAdd.Mount();
    labelToAdd.AddListeners();
    
    SearchAndUpdate(labelToAdd.NAME, labelToAdd.TYPE);

  }

  RemoveLabel() {

    const labelToRemove = document.getElementById(this.LABELID);
    labelToRemove.remove();
    SearchFromDeleteLabel();
  }

  AddListener() {
    this.SetClick();
    this.SetHovered();

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


filterZones.forEach((btn) => { /** Écouteur d'événement pour les boutons des filtres */
  const input = btn.querySelector('input');
  const list = btn.querySelector('.filterList'); // Récupère la liste de filtres associée au bouton

  input.addEventListener('click', (e) => {
    e.stopPropagation();
    input.focus();
  });

  input.addEventListener('keyup', () => {
    const filtersArray = Array.from(list.querySelectorAll('.filterOption'));
    SearchListInput(filtersArray, input.value);
  });


  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    const btnID = btn.id.replace('Filter', ''); // Récupère le nom du bouton de filtre
    toggleList(btnID); // Affiche ou cache la liste de filtres associée au bouton
  });
});

/** Écouteur d'événement de clic en dehors de la zone active */
document.body.addEventListener('click', (e2) => {
  const activeFilter = document.querySelector('.filter.active');
  const activeBtnID = activeFilter?.id.replace('Filter', '');

  if (activeFilter) {
    if (e2.target.id !== activeFilter.id) {
      // Si l'élément cliqué n'est pas le filtre actif
      toggleList(activeBtnID); // Ferme le filtre actif
    } else if (
      e2.target.classList.contains('filter:not(active)')       
    ) {
      // Si l'élément cliqué est un filtre
      toggleList(activeBtnID); // Ferme le filtre actif
      toggleList(e2.target.id); // Ouvre le filtre inactif sur lequel l'utilisateur a cliqué
    }
  }
});

function SearchAndUpdate(name, type) {
  UpdateRecipes(SearchFromFilter(name, type,));
  UpdateFilters(SearchFromFilter(name, type,));
  RestoreActive();

}

function RestoreActive() {
  
  const CurrentLabels = document.querySelectorAll('.labels');
  const CurrentFilters = document.querySelectorAll('.filterOption');

  if (CurrentLabels) {
    for (const CurrentLabel of CurrentLabels) {
      const NormalizedLabel = CurrentLabel.getAttribute('data-normalized');

      for (const CurrentFilter of CurrentFilters) {
        const NormalizedFilter = CurrentFilter.getAttribute('data-normalized');
        const RAWNAME = CurrentFilter.getAttribute('data-name');

        if (NormalizedLabel === NormalizedFilter) {
          CurrentFilter.classList.add('active');
          CurrentFilter.innerHTML = `<p class='FilterName m-0 '>${RAWNAME}</p><i class=" fa-solid fa-xmark filter-Icon ms-4 me-1 "></i>`;
        }
      }
    }
  }
}

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
}

// Exportation des fonctions pour les rendre disponibles dans d'autres fichiers
export { GetAllFilters, GetFilters, UpdateFilters, SearchAndUpdate };
