/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */

// Importation des classes et fonctions nécessaires depuis d'autres fichiers
import { Label } from "./labels.js";
import { SearchFromFilter, SearchListInput } from "./search.js";
import { UpdateRecipes, getNormalized } from "../controllers/RecipesController.js";

/** Classe Filter */
class Filter {
  constructor(element, arrayName) {
    this.element = element;
    this.arrayName = arrayName;
    this.filterElement = document.createElement("div");
    this.filterName = element.charAt(0).toUpperCase() + element.slice(1);
    this.normalizedName = getNormalized(this.filterName);
    this.filterID = `Filter-${this.normalizedName}`;
    this.label = new Label(this.filterName);
    this.setupFilterElement();
    this.addEventListeners();
    this.addToFilterList();
  }

  setupFilterElement() {
    this.filterElement.id = this.filterID;
    this.filterElement.setAttribute("data-NormalizedName", this.normalizedName);
    this.filterElement.innerHTML = `${this.filterName}`;
    this.filterElement.classList.add(
      "filterOption",
      "d-flex",
      "align-items-center",
      "justify-content-between",
      "px-2",
      "py-2"
    );
  }

  addEventListeners() {
    this.filterElement.addEventListener("click", (e) => {
      e.stopPropagation();

      const labelsArray = Array.from(document.querySelectorAll(".labels"));
      const keywordsArray = [];
      for (const label of labelsArray) { keywordsArray.push(label.innerText); }
      const activeFilter = this.filterElement.classList.contains("active");
      const activeBtn = document.querySelector(".filter.active");
      const btnID = activeBtn?.id.replace("Filter", "");

      if (!activeFilter) { //si le filtre n'est pas actif
        this.filterElement.classList.add("active");

        this.filterElement.innerHTML = `<p class='filterName m-0 '>${this.filterName}</p><i class="fa-solid fa-circle-xmark filter-Icon"></i>`;
        this.filterElement.classList.add("active");

        const labelDom = this.label.getDom();
        labelContainer.appendChild(labelDom);

        keywordsArray.push(this.normalizedName);
        SearchAndUpdate(keywordsArray, btnID);

      } else if (
        ( e.target.classList.contains("filter-Icon")) ) {
        this.filterElement.classList.remove("active");
        this.filterElement.innerHTML = `<p class='filterName m-0 '>${this.filterName}</p>`;

        const label = document.getElementById(`label-${this.normalizedName}`);
        label.remove();
        keywordsArray.pop(this.normalizedName);
        console.log(keywordsArray);
        SearchAndUpdate(keywordsArray, btnID);
      }
    });

    this.filterElement.addEventListener("mouseover", () => {
      this.filterElement.classList.add("hovered");
    });

    this.filterElement.addEventListener("mouseout", () => {
      this.filterElement.classList.remove("hovered");
    });
  }

  addToFilterList() {
    if (this.arrayName === "ingredients") {
      filterIngredientsList.appendChild(this.filterElement);
    } else if (this.arrayName === "appliances") {
      filterApplianceList.appendChild(this.filterElement);
    } else if (this.arrayName === "ustensils") {
      filterUstensilsList.appendChild(this.filterElement);
    }
  }
}

/** Variables des éléments */
// Sélection des éléments HTML à utiliser pour la gestion des filtres
const filterIngredientsList = document.getElementById("ingredientsList");
const filterApplianceList = document.getElementById("appliancesList");
const filterUstensilsList = document.getElementById("ustensilsList");
const filtersBtn = document.querySelectorAll(".filterBtn");
const labelContainer = document.getElementById("labelsContainer");
const filtersInput = document.querySelectorAll(".inputFilterBtn");

filtersInput.forEach((input) => {
  input.addEventListener('keyup', () => {
    const list = document.getElementById(input.parentElement.parentElement.id);
    const filtersArray = Array.from(list.getElementsByClassName('filterOption'));
    SearchListInput(filtersArray, input.value);
  });
});

filtersBtn.forEach((btn) => { /** Écouteur d'événement pour les boutons des filtres */

  const input = btn.querySelector("input");
  const btnID = btn.id; // Récupère l'ID du bouton

  btn.addEventListener("click", (e) => {
    if (input.contains(e.target)) {
      e.stopImmediatePropagation();
    } else {
      e.stopPropagation();
      toggleList(btnID);
    }
  });
});

/** Écouteur d'événement de clic en dehors de la zone active */
document.body.addEventListener("click", (e2) => {
  const activeFilter = document.querySelector(".filter.active");
  const inactiveFilters = document.querySelectorAll(".filter:not(.active)");
  const activeBtnID = activeFilter?.id.replace("Filter", "");

  if (activeFilter) {
    if (e2.target.id !== activeFilter.id) {
      // Si l'élément cliqué n'est pas le filtre actif
      toggleList(activeBtnID); // Ferme le filtre actif
    }
    if (
      e2.target.classList.contains("filter") &&
      !e2.target.classList.contains("active")
    ) {
      // Si l'élément cliqué est un filtre
      toggleList(activeBtnID); // Ferme le filtre actif
      toggleList(e2.target.id); // Ouvre le filtre inactif sur lequel l'utilisateur a cliqué
    }
  }
});

function SearchAndUpdate(keywords, filterName) {
  const NewRecipesArray = SearchFromFilter(
    keywords,
    filterName
  );
  UpdateRecipes(NewRecipesArray);
  UpdateFilters(NewRecipesArray);
}

/** Fonction qui crée tous les filtres.
 * @param {Array} Array - Le tableau contenant les filtres à créer
 */
function GetAllFilters(Array) { // Parcourt chaque élément de fullArray et appelle GetFilters pour chaque élément.
  Array.forEach((obj) => {
    const arrayName = Object.keys(obj)[0];
    const arrayElement = Object.values(obj)[0].sort((a, b) => a.localeCompare(b));

    const list = document.getElementById(`${arrayName}List`);
    const oldElements = list.querySelectorAll(".filterOption");
    oldElements.forEach((oldElement) => { oldElement.remove(); });
    GetFilters({ [arrayName]: arrayElement });
  });
}

/** Fonction qui crée un filtre pour un objet donné.
 * @param {Object} Obj - L'objet pour lequel on veut créer un filtre
 */
function GetFilters(Obj) {
  const arrayName = Object.keys(Obj)[0];
  const arrayFull = Object.values(Obj)[0].sort((a, b) => a.localeCompare(b));

  arrayFull.forEach((element) => { // Parcourt chaque élément du tableau et crée un élément HTML pour chaque élément.
    const filter = new Filter(element, arrayName);
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

  list.classList.toggle("active");
  list.classList.toggle("d-none");
  btn.classList.toggle("rounded-bottom-4");
  btn.classList.toggle("active");
  zone.classList.toggle("active");
  btn.querySelector("i").classList.toggle("fa-chevron-down");
  btn.querySelector("i").classList.toggle("fa-chevron-up");
  if (list.classList.contains("active")) {
    input.value = "";
  }
}

/** Fonction qui met à jour les filtres en fonction des recettes filtrées.
 * @param {Array} updatedFiltersArray - Le tableau contenant les recettes filtrées
 * @returns {Array} - Le tableau mis à jour des éléments de filtre
 */
function UpdateFilters(updatedFiltersArray) {
  const NewappliancesArray = [];
  const NewIngredientsArray = [];
  const NewUstensilesArray = [];

  const ActiveFilters = Array.from(document.querySelectorAll(".filterOption.active"));

  for (const recipe of updatedFiltersArray) {
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
  const UpdatedElement = [
    UpdatedFilterIngredients,
    UpdatedFilterApplicances,
    UpdatedFilterUstensiles,
  ];
  GetAllFilters(UpdatedElement);
  document.querySelectorAll(".filterOption").forEach((element) => {
    const elementName = element.textContent;
    const normalizedElementName = getNormalized(elementName);
    for (const filter of ActiveFilters) {
      const filterName = filter.textContent;
      const normalizedFilterName = getNormalized(filterName);
      if (normalizedElementName.includes(normalizedFilterName)) {

        element.innerHTML = `<p class='filterName m-0 '>${elementName}</p><i class="fa-solid fa-circle-xmark filter-Icon"></i>`;
        element.classList.add("active");
      }
    }
  });
}

// Exportation des fonctions pour les rendre disponibles dans d'autres fichiers
export { GetAllFilters, GetFilters, UpdateFilters, SearchAndUpdate };
