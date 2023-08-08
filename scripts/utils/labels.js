/* eslint-disable import/prefer-default-export */

// Importation du module depuis un autre fichier
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

    SetLabel() {
        
        this.ELEMENT.setAttribute('id', this.ID);
        this.ELEMENT.setAttribute('data-normalized', this.NORMALIZED);
        this.ELEMENT.setAttribute('data-name', this.RAWNAME);
        this.ELEMENT.setAttribute('data-type', this.TYPE);

        this.ELEMENT.innerHTML = `<span>${this.RAWNAME}</span><i class="fa-solid fa-xmark label-Icon ms-4 me-1 "></i>`;
        this.ELEMENT.classList.add('labels',  'd-flex', 'align-items-center', 'justify-content-between',
                                    'positon-relative', 'rounded-4', 'ms-2', 'me-4', 'ps-3', 'pe-2', 'py-4' );
        
        this.ICON = this.ELEMENT.querySelector('.label-Icon');
    }

    
    
    Mount() {
        this.CONTAINER.appendChild(this.ELEMENT);
    }

    Unmount() {
        this.ELEMENT.remove();
    }

}

// Exportation de la classe Label pour la rendre disponible dans d'autres fichiers
export { Label };
