/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */

// Importation des classes et fonctions nécessaires depuis d'autres fichiers
import { Label } from "./labels.js";
import { SearchFromFilter } from "./search.js";
import { UpdateRecipes, getNormalized } from "../controllers/RecipesController.js";

/** Classe Filter */
class Filter {
  constructor(element, arrayName) {
    this.element = element;
    this.arrayName = arrayName;
    this.filterElement = document.createElement("div");
    this.filterName = element.toUpperCase().charAt(0) + element.slice(1);
    this.normalizedName = getNormalized(this.filterName);
    this.filterID = `Filter-${this.normalizedName}}`;
    this.keywordsArray = Array.from(document.querySelectorAll(".labels"));

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
      const keywordsArray = [];
      const labelsArray = Array.from(document.querySelectorAll(".labels"));
      for (let label of labelsArray) {
        keywordsArray.push(label.getAttribute("data-normalizedname"));
      }
      const activeFilter = this.filterElement.classList.contains("active");
      const activeBtn = document.querySelector(".filter.active");
      const btnID = activeBtn?.id.replace("Filter", "");

      if (!activeFilter) {//si le filtre n'est pas actif
        this.filterElement.classList.add("active");
        const label = new Label(this.filterName);
        const labelDom = label.getDom();

        this.filterElement.innerHTML = `<p class='filterName m-0 '>${this.filterName}</p><i class="fa-solid fa-circle-xmark filter-icon"></i>`;
        this.filterElement.classList.add("active");

        labelContainer.appendChild(labelDom);
        keywordsArray.push(this.normalizedName);
        const NewRecipesArray = SearchFromFilter(
          keywordsArray,
          this.arrayName
        );
        UpdateRecipes(NewRecipesArray);
        UpdateFilters(NewRecipesArray);
        
      } else if (
        e.target.classList.contains("filter-icon") ||
        e.target.classList.contains("filterName") ||
        (e.target.classList.contains("filterOption") && activeFilter)
      ) {
        e.stopPropagation();
        this.filterElement.classList.toggle("active");
        this.filterElement.innerHTML = `${this.filterName}  `;
        const labelDom = document.getElementById(
          `label-${getNormalized(this.filterName)}`
        );
        labelDom.remove();
        this.keywordsArray.pop(this.filterName);
        const NewRecipesArray = SearchFromFilter(keywordsArray, btnID);
        UpdateRecipes(NewRecipesArray);        
        UpdateFilters(NewRecipesArray);

      } else if (activeFilter) {
        const labelDom = document.getElementById(`label-${this.filterName}`);
        labelDom.remove();
        this.keywordsArray.pop(this.filterName);
        const NewRecipesArray = SearchFromFilter(
          this.keywordsArray,
          this.arrayName
        );
        console.log("label", ...this.keywordsArray);
                UpdateRecipes(NewRecipesArray);
UpdateFilters(NewRecipesArray);
        this.filterElement.innerHTML = `${this.filterName}  `;
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
const labels = document.querySelectorAll(".labels");
const mainInput = document.querySelector("#mainSearchInput");

/** Écouteur d'événement pour les boutons des filtres */
filtersBtn.forEach((btn) => {
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

/** Fonction qui crée tous les filtres.
 * @param {Array} Array - Le tableau contenant les filtres à créer
 */
function GetAllFilters(Array) {// Parcourt chaque élément de fullArray et appelle GetFilters pour chaque élément.
  Array.forEach((obj) => {
    const arrayName = Object.keys(obj)[0];
    const arrayElement = Object.values(obj)[0].sort((a, b) => a.localeCompare(b));

    if (arrayName === "ingredients") {
      const OldElements = document.querySelectorAll("#ingredientsList .filterOption");
      OldElements.forEach((Oldelement) => { Oldelement.remove(); });
      GetFilters({ ingredients: arrayElement });
    } else if (arrayName === "appliances") {
      const OldElements = document.querySelectorAll("#appliancesList .filterOption");
      OldElements.forEach((Oldelement) => { Oldelement.remove(); });
      GetFilters({ appliances: arrayElement });
    } else if (arrayName === "ustensils") {
      const OldElements = document.querySelectorAll("#ustensilsList .filterOption");
      OldElements.forEach((Oldelement) => { Oldelement.remove(); });
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
  const test = updatedFiltersArray;
  const NewappliancesArray = [];
  const NewIngredientsArray = [];
  const NewUstensilesArray = [];

  const ActiveFilters = Array.from(
    document.querySelectorAll(".filterOption.active")
  );
  console.log(ActiveFilters);
  for (let i = 0; i < updatedFiltersArray.length; i += 1) {
    const { appliance, ingredients, ustensils } = updatedFiltersArray[i];
    if (!NewappliancesArray.includes(appliance)) {
      NewappliancesArray.push(appliance);
    }
    for (let j = 0; j < ingredients.length; j += 1) {
      const IngredientsObject = ingredients[j];
      const { ingredient } = IngredientsObject;
      if (!NewIngredientsArray.includes(ingredient)) {
        NewIngredientsArray.push(ingredient);
      }
    }
    for (let k = 0; k < ustensils.length; k += 1) {
      const ustensil = ustensils[k];
      if (!NewUstensilesArray.includes(ustensil)) {
        NewUstensilesArray.push(ustensil);
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
  GetAllFilters(UpdatedElement);
  document.querySelectorAll(".filterOption").forEach((element) => {
    const elementName = element.textContent;
    const normalizedElementName = getNormalized(elementName);
    for (let filter of ActiveFilters) {
      const filterName = filter.textContent;
      const normalizedFilterName = getNormalized(filterName);
      if (normalizedElementName.includes(normalizedFilterName)) {
        console.log(element.textContent);
        console.log(filter.textContent);
        element.innerHTML = `<p class='filterName m-0 '>${filterName}</p><i class="fa-solid fa-circle-xmark filter-icon"></i>`;
        element.classList.add("active");
      }
    }
  });
}

// Exportation des fonctions pour les rendre disponibles dans d'autres fichiers
export { GetAllFilters, GetFilters, UpdateFilters, Filter };
