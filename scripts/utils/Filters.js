
import {
  IngredientsObject,
  AppliancesObject,
  UstensilesObject,
} from '../controllers/datasController.js';



/**
 * Variables des éléments
 */
const filterIngredientsList = document.getElementById('ingredientsList');
const filterApplianceList = document.getElementById('appliancesList');
const filterUstensilsList = document.getElementById('ustensilesList');
const filtersBtn = document.querySelectorAll('.filterBtn');
const FullArray = [IngredientsObject, AppliancesObject, UstensilesObject];


/**
 * Écouteur d'événement pour les bouton des filtres
 */
filtersBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
        
        btn.classList.toggle('active')
        const { id } = btn
        displayFilter(id)
  })
})

/**
 * Fonction qui crée tous les filtres.
 */
function CreateAllFilters() {

  // Parcourt chaque élément de FullArray et appelle CreateFilter pour chaque élément.
  FullArray.forEach((element) => {
    CreateFilter(element);
  });
}

/**
 * Fonction qui crée un filtre pour un objet donné.
 * @param {Object} Obj - L'objet pour lequel on veut créer un filtre. ex: {'Ingredients': $IngredientsArray}
 */
function CreateFilter(Obj) {
  const Arrayname = Object.keys(Obj)[0];
  const Arrayfull = Object.values(Obj)[0].sort();
  Arrayfull.forEach((element) => {
    const optionElement = document.createElement('div');
    optionElement.id = element;
    optionElement.innerHTML = `${element}`;
    optionElement.classList.add('filter');

    if (Arrayname === 'Ingredients') {
      filterIngredientsList.appendChild(optionElement);
    } else if (Arrayname === 'Matériel') {
      filterApplianceList.appendChild(optionElement);
    } else if (Arrayname === 'Ustensiles') {
      filterUstensilsList.appendChild(optionElement);
    }
    })
}

function displayFilter(FilterID){
  const list = document.getElementById(`${FilterID}List`)  
  list.classList.toggle('hidden')
  list.classList.toggle('active')
}

export { CreateAllFilters, CreateFilter };
