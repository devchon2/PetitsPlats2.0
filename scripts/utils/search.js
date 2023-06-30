/* eslint-disable no-unused-vars */
import { recipesArray } from '../controllers/datasController.js';

import { Label } from './labels.js';

console.log('search.js loaded')

class Search {
  constructor(btnId) {
    this.id = btnId.replace('SearchButton', '');
    console.log(this.id);
    this.searchInput = document.getElementById(`${this.id}SearchInput`);
    console.log(this.searchInput);
    this.Keywords = document.querySelectorAll('.label')
  }

  createLabel() {
    const filterElement = document.querySelector(`Filter-${this.id}.filterOption`);
    console.log(filterElement);
    const Filterlist = document.querySelector(`#${this.id}List.filter`); 
    
    const labelContainer = document.getElementById('labelsContainer');
    const SearchInput = this.searchInput;
    console.log(SearchInput);
    const label = new Label(`${this.searchInput.value}`);
     const labelDom = label.getDom();
     if(!labelContainer.querySelector(`#label-${this.id}` )) {
        labelContainer.appendChild(labelDom);
      if(filterElement) {
        filterElement.classList.toggle('active');
      }}

      };
 
  
    search() {
    this.Keywords.forEach(keyword => keyword)
    }
}

const SearchButtons = document.querySelectorAll('button');

SearchButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    
    e.stopPropagation();
    const search = new Search(button.id);
    search.createLabel();
    const result=search.search();
    console.log(result);
  })
})

export default { Search };