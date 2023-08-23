// Importation du module Normalized depuis un autre fichier
import { Normalized } from './search.js';

/**
 * Classe représentant un label.
 * @class Label
 */
class Label {
    /**
     * Crée une instance de Label.
     * @constructor
     * @param {string} name - L'identifiant du label.
     * @param {string} type - Le type de label.
     */
    constructor(name, type) {
        this.NAME = name;
        this.TYPE = type;
        this.RAWNAME = this.NAME.toUpperCase().charAt(0) + this.NAME.slice(1);
        this.NORMALIZED = Normalized(this.RAWNAME);
        this.ID = `label-${this.NORMALIZED}`;
        this.FILTERID = `Filter-${this.NORMALIZED}`;
        this.ELEMENT = document.createElement('div');        
        this.CONTAINER = document.getElementById('labelsContainer');
    }

    /**
     * Configure les attributs et le contenu du label.
     */
    SetLabel() {
        this.ELEMENT.setAttribute('id', this.ID);
        this.ELEMENT.setAttribute('data-normalized', this.NORMALIZED);
        this.ELEMENT.setAttribute('data-name', this.RAWNAME);
        this.ELEMENT.setAttribute('data-type', this.TYPE);

        this.ELEMENT.innerHTML = `<span class="labelName">${this.RAWNAME}</span><i class="fa-solid fa-xmark label-Icon "></i>`;
        this.ELEMENT.classList.add('labels');
        
        this.ICON = this.ELEMENT.querySelector('.label-Icon');
    }

    /**
     * Attache l'élément du label au conteneur.
     */
    Mount() {
        this.CONTAINER.appendChild(this.ELEMENT);
    }

    /**
     * Détache l'élément du label du conteneur.
     */
    Unmount() {
        this.ELEMENT.remove();
    }
}

export default Label;
