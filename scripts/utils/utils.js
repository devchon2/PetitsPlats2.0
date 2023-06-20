import { recipesArray } from '../controllers/datasController.js';

const selectIngredientsBtn = document.getElementById('ingredientsList');
selectIngredientsBtn.innerHTML = '<p>Ingrédients <i class="fa-arrow fa-arrow-bottom"></i></p>';
const selectApplianceBtn = document.getElementById('appliancesList');
selectApplianceBtn.innerHTML = '<p>Ingrédients <i class="fa-arrow fa-arrow-bottom"></i></p>';
const selectUstensilsBtn = document.getElementById('ustensilesList');
selectUstensilsBtn.innerHTML = '<p>Ingrédients <i class="fa-arrow fa-arrow-bottom"></i></p>';

function CreateAllFilters(FiltersArrays) {
  const FiltersLabels = FiltersArrays[0];
  const FiltersArray = FiltersArrays[1];

  for (let i = 0; i <= FiltersLabels.lenght; i += 1) {
    CreateFilter(FiltersLabels[i], FiltersArray[i]);
  }
}
function CreateFilter(Arrayname, Arrayfull) {
  if (Arrayname === 'Ingredients') {
    Arrayfull.forEach((element) => {
        const optionElement = document.createElement('option');
        optionElement.setAttribute('value', element);
        optionElement.innerText = element;
        selectIngredientsBtn.appendChild(optionElement);
    });
  }
  if (Arrayname === 'Appliances') {
    Arrayfull.forEach((element) => {
        const optionElement = document.createElement('option');
        optionElement.setAttribute('value', element);
        optionElement.innerText = element;
        selectIngredientsBtn.appendChild(optionElement);
    });
  }
  if (Arrayname === 'Ustensiles') {
    Arrayfull.forEach((element) => {
        const optionElement = document.createElement('option');
        optionElement.setAttribute('value', element);
        optionElement.innerText = element;
        selectIngredientsBtn.appendChild(optionElement);
    });
  }
}

export { CreateAllFilters, CreateFilter };
