/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */

// Importation des classes et fonctions nécessaires depuis d'autres fichiers
import { Label } from './labels.js';
import { SearchListInput, SearchRecipes } from './search.js';
import {
  UpdateRecipes,
  getNormalized,
} from '../controllers/RecipesController.js';
import { recipesArray } from '../controllers/datasController.js';

/** Variables des éléments */
// Sélection des éléments HTML à utiliser pour la gestion des filtres
const filterIngredientsList = document.getElementById('ingredientsList');
const filterApplianceList = document.getElementById('appliancesList');
const filterUstensilsList = document.getElementById('ustensilsList');
const filtersBtn = document.querySelectorAll('.filterBtn');
const labelContainer = document.getElementById('labelsContainer');
const filtersInput = document.querySelectorAll('.filterInput');
const mainInput = document.querySelector('#mainSearchInput');

/** Écouteur d'événement pour les boutons des filtres */
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
});

/** Fonction qui crée tous les filtres.
 * @param {Array} Array - Le tableau contenant les filtres à créer
 */
function GetAllFilters(Array) {
  console.log('GetAllFilters chargé');
  // Parcourt chaque élément de fullArray et appelle GetFilters pour chaque élément.
  Array.forEach((obj) => {
    const arrayName = Object.keys(obj)[0];
    const arrayElement = Object.values(obj)[0].sort((a, b) =>
      a.localeCompare(b)
    );

    if (arrayName === 'ingredients') {
      const OldElements = document.querySelectorAll(
        '#ingredientsList .filterOption'
      );
      OldElements.forEach((Oldelement) => {
        Oldelement.remove();
      });
      GetFilters({ ingredients: arrayElement });
    } else if (arrayName === 'appliances') {
      const OldElements = document.querySelectorAll(
        '#appliancesList .filterOption'
      );
      OldElements.forEach((Oldelement) => {
        Oldelement.remove();
      });
      GetFilters({ appliances: arrayElement });
    } else if (arrayName === 'ustensils') {
      const OldElements = document.querySelectorAll(
        '#ustensilsList .filterOption'
      );
      OldElements.forEach((Oldelement) => {
        Oldelement.remove();
      });
      GetFilters({ ustensils: arrayElement });
    }
  });
}

/** Fonction qui crée un filtre pour un objet donné.
 * @param {Object} Obj - L'objet pour lequel on veut créer un filtre
 */
function GetFilters(Obj) {
  const arrayName = Object.keys(Obj)[0];
  const arrayFull = Object.values(Obj)[0].sort((a, b) => a.localeCompare(b));

  arrayFull.forEach((element) => {
    // Parcourt chaque élément du tableau et crée un élément HTML pour chaque élément.

    const filterElement = document.createElement('div'); // Crée un élément HTML
    const filterName = element.toUpperCase().charAt(0) + element.slice(1); // Met la première lettre en majuscule
    filterElement.id = `Filter-${getNormalized(filterName)}`;
    filterElement.innerHTML = `${filterName}`;
    filterElement.classList.add(
      'filterOption',
      'd-flex',
      'align-items-center',
      'justify-content-between',
      'px-2',
      'py-2'
    );

    /// Écouteur d'événement Click pour chaque élément de filtre.
    filterElement.addEventListener('click', (e) => {
      e.stopPropagation();

      const activeFilter = filterElement.classList.contains('active'); // Récupère l'élément de filtre en état actif
      const activeBtn = document.querySelector('.filter.active');
      const ExistentLabels = Array.from(
        document.getElementsByClassName('labels')
      );

      if (!activeFilter) {
        filterElement.classList.add('active');
        console.log('ExistentLabels', ExistentLabels);
        const label = new Label(filterName);
        const labelDom = label.getDom();

        // Active le dom du filtre et affiche le label
        filterElement.innerHTML = `<p class='filterName m-0 '>${filterName}</p><i class="fa-solid fa-circle-xmark filter-icon"></i>`;

        const NewRecipesArray = SearchRecipes([mainInput.value,filterName], 'filter');
        const UpdatedElement = UpdateFilters(NewRecipesArray);
        labelContainer.appendChild(labelDom);

        UpdateRecipes(NewRecipesArray);
      } else if (
        e.target.classList.contains('filter-icon') ||
        e.target.classList.contains('filterName') ||
        (e.target.classList.contains('filterOption') && activeFilter)
      ) {
        // Si actif et que l'utilisateur clique sur le contenu du filtre, il supprime le filtre.
        e.stopPropagation();
        filterElement.classList.toggle('active');
        console.log('filterName', filterName);
        filterElement.innerHTML = `${filterName}  `;
        const labelDom = document.getElementById(
          `label-${getNormalized(filterName)}`
        );
        labelDom.remove();
        console.log('existantLabels ', ExistentLabels);
      } else if (activeFilter) {
        filterElement.classList.remove('active');
        console.log('ExistentLabels', ExistentLabels);
        const labelDom = document.getElementById(`label-${filterName}`);
        labelDom.remove();

        // Active le dom du filtre et affiche le label
        filterElement.innerHTML = `<p class='filterName m-0 '>${filterName}</p><i class="fa-solid fa-circle-xmark filter-icon"></i>`;

        const NewRecipesArray = SearchRecipes([mainInput.value,filterName],'filter');
        const UpdatedElement = UpdateFilters(NewRecipesArray);
        labelContainer.appendChild(labelDom);

        UpdateRecipes(NewRecipesArray);
      } else {
        toggleList(activeBtn.id);

        const labelDom = document.getElementById(`label-${filterName}`);
        labelDom.remove();
        filterElement.innerHTML = `${filterName}  `;
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
 * @param {string} FilterID - Le nom du bouton de filtre
 */
function toggleList(FilterID) {
  const list = document.getElementById(`${FilterID}List`);
  const btn = document.getElementById(`${FilterID}`);
  const zone = document.getElementById(`${FilterID}Filter`);
  const input = list.firstElementChild.firstElementChild;

  list.classList.toggle('active');
  list.classList.toggle('d-none');
  btn.classList.toggle('rounded-bottom-4');
  btn.classList.toggle('active');
  zone.classList.toggle('active');
  btn.querySelector('i').classList.toggle('fa-chevron-down');
  btn.querySelector('i').classList.toggle('fa-chevron-up');
  if (list.classList.contains('active')) {
 input.value = '';  }
}

/** Fonction qui met à jour les filtres en fonction des recettes filtrées.
 * @param {Array} updatedArray - Le tableau contenant les recettes filtrées
 * @returns {Array} - Le tableau mis à jour des éléments de filtre
 */
function UpdateFilters(updatedArray) {
  const NewappliancesArray = [];
  const NewIngredientsArray = [];
  const NewUstensilesArray = [];

  for (let i = 0; i < updatedArray.length; i += 1) {
    const { appliance, ingredients, ustensils } = updatedArray[i];
    if (!NewappliancesArray.includes(appliance)) {
      NewappliancesArray.push(appliance);
    }
    for (let j = 0; j < ingredients.length; j += 1) {
      const element = ingredients[j];
      if (!NewIngredientsArray.includes(element.ingredient)) {
        NewIngredientsArray.push(element.ingredient);
      }
    }
    for (let k = 0; k < ustensils.length; k += 1) {
      const element = ustensils[k];
      if (!NewUstensilesArray.includes(element)) {
        NewUstensilesArray.push(element);
      }
    }
  }

  const UpdatedFilterApplicances = { appliances: NewappliancesArray };
  const UpdatedFilterIngredients = { ingredients: NewIngredientsArray };
  const UpdatedFilterUstensiles = { ustensils: NewUstensilesArray };
  const UpdatedElement = [
    UpdatedFilterIngredients,
    UpdatedFilterApplicances,
    UpdatedFilterUstensiles,
  ];

  return UpdatedElement;
}

// Exportation des fonctions pour les rendre disponibles dans d'autres fichiers
export { GetAllFilters, GetFilters, UpdateFilters };
