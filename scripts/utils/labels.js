/* eslint-disable import/prefer-default-export */

import { getNormalized } from '../controllers/RecipesController.js';
/** Class representing a label.
 * @class Label
 */
class Label {
    constructor(id) {
        this.id = id;
        this.normalizedName = getNormalized(this.id);
        this.labelName = this.id.toUpperCase().charAt(0) + this.id.slice(1);
        this.html = `<span>${this.labelName}</span>
                    <i class="hidden fa-solid fa-xmark label-icon ms-4 me-1 "></i>
                    `;

        this.labelElement = document.createElement('div');
        this.labelElement.classList.add('labels', 'd-flex', 'align-items-center', 'justify-content-between', 'positon-relative', 'rounded-4', 'ms-2', 'me-4', 'ps-3', 'pe-2', 'py-4');
        this.labelElement.id = `label-${this.normalizedName}`;


        this.labelElement.innerHTML = `${this.html}`;
        this.labelIcon = this.labelElement.querySelector('.label-icon');
        this.filter = document.querySelector(`#Filter-${this.normalizedName}`);
        this.addListener();
    }

    /** Get the label's ID.
     *
     * @returns {HTMLElement} Returns an HTML element "label" and adds a "click" event on the icon to remove the label.
     */
    getDom() {
        return this.labelElement;
    }

    addListener() {
        this.labelIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            this.filter.innerHTML = `${this.id}`
            this.filter.classList.remove('active');
            this.labelElement.remove();
        }
        );
    }
}

export { Label };