/* eslint-disable import/prefer-default-export */

// Importation du module depuis un autre fichier
import { getNormalized } from '../controllers/RecipesController.js';
import { SearchAndUpdate } from '../utils/Filters.js';

/**
 * Classe représentant un label.
 * @class Label
 */
class Label {
    /**
     * Crée une instance de Label.
     * @constructor
     * @param {string} id - L'identifiant du label.
     */
    constructor(id) {
        this.id = id;
        this.labelName = this.id.toUpperCase().charAt(0) + this.id.slice(1);
        this.normalizedName = getNormalized(this.labelName);
        this.html = `<span>${this.labelName}</span>
                    <i class="fa-solid fa-xmark label-Icon ms-4 me-1 "></i>`;
        this.labelElement = document.createElement('div');
        this.labelElement.innerHTML = `${this.html}`;
        this.labelElement.id = `label-${this.normalizedName}`;
        this.labelElement.setAttribute('data-NormalizedName', this.normalizedName);
        this.labelElement.classList.add('labels', 'd-flex', 
                                        'align-items-center', 'justify-content-between', 
                                        'positon-relative', 'rounded-4', 
                                        'ms-2', 'me-4', 
                                        'ps-3', 'pe-2', 
                                        'py-4'
                                        );

        
        // Sélectionne l'icône du label
        this.labelIcon = this.labelElement.querySelector('.label-Icon');

        this.addListener();        // Ajoute un écouteur d'événement sur l'icône pour supprimer le label lorsque l'utilisateur clique dessus

        
        this.mainInput = document.querySelector('#mainSearchInput');
    }

    /**
     * Récupère l'élément HTML représentant le label.
     * @returns {HTMLElement} - Retourne l'élément HTML du label avec l'icône de suppression associée.
     */
    getDom() {
        return this.labelElement;
    }

    getNormalizedName() {
        return this.normalizedName;
    }

    /**
     * Ajoute un écouteur d'événement sur l'icône de suppression du label.
     */
    addListener() {
        
        this.labelIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            this.labelElement.remove();
            const labels = Array.from(document.querySelectorAll('.labels'));    
            const filter = document.getElementById(`Filter-${this.normalizedName}`);
            filter.classList.remove('active');
            filter.innerHTML = `<p class='filterName m-0 '>${this.labelName}</p>`
            SearchAndUpdate(labels, this.labelName);

        
    });
    }
}

// Exportation de la classe Label pour la rendre disponible dans d'autres fichiers
export { Label };
