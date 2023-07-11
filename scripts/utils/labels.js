/* eslint-disable import/prefer-default-export */

/** Class representing a label.
 * @class Label
 */
class Label {
    constructor(id) {
        this.id = id;
        this.html = `<div class="labels" id="label-${this.id}">
                        <span>${this.id}</span>
                        <i class="hidden fa-solid fa-xmark label-icon"></i>
                    </div>`;

        this.labelElement = document.createElement('div');
        this.labelElement.innerHTML = `${this.html}`;
        this.labelIcon = this.labelElement.querySelector('.label-icon');
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
            const filter = document.querySelector(`#Filter-${this.id}`);
            if (filter) {
                filter.classList.remove('active');
                filter.innerHTML = `${this.id}`;
                this.labelElement.remove();
            } else {
                this.labelElement.remove();
            }
        });
    }
}

export { Label };
