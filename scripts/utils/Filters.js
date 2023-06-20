
import { IngredientsObject, AppliancesObject, UstensilesObject } from '../controllers/datasController.js';

const selectIngredientsBtn = document.getElementById('ingredientsList');
selectIngredientsBtn.innerHTML = '<p>Ingrédients <i class="fa-arrow fa-arrow-bottom"></i></p>';

const selectApplianceBtn = document.getElementById('appliancesList');
selectApplianceBtn.innerHTML = '<p>Ingrédients <i class="fa-arrow fa-arrow-bottom"></i></p>';

const selectUstensilsBtn = document.getElementById('ustensilesList');
selectUstensilsBtn.innerHTML = '<p>Ingrédients <i class="fa-arrow fa-arrow-bottom"></i></p>';

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
 * @param {Object} Obj - L'objet pour lequel on veut créer un filtre.ex: {Ingredients: IngredientsArray}
 */
function CreateFilter(Obj) {
  const Arrayname = Object.keys(Obj)[0];
  const Arrayfull = Object.values(Obj)[0].sort();
  const label = document.createElement('span');
  label.classList.add('label');
  label.innerText = Arrayname;

  Arrayfull.forEach((element) => {
    const optionElement = document.createElement('option');
    optionElement.setAttribute('value', element);
    optionElement.innerText = element;

    if (Arrayname === 'Ingredients') {
      selectIngredientsBtn.appendChild(optionElement);
      

    } else if (Arrayname === 'Matériel') {
      selectApplianceBtn.appendChild(optionElement);

    } else if (Arrayname === 'Ustensiles') {
      selectUstensilsBtn.appendChild(optionElement);
      
    }
  });
}

// On exporte les fonctions pour pouvoir les utiliser dans d'autres fichiers.
export { CreateAllFilters, CreateFilter };
