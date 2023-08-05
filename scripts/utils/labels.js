/* eslint-disable import/prefer-default-export */

// Importation du module depuis un autre fichier
import { Normalized } from '../controllers/RecipesController.js';

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
        this.ELEMENT = document.createElement('div');
        this.RAWNAME = this.NAME.toUpperCase().charAt(0) + this.NAME.slice(1);
        this.NORMALIZED = Normalized(this.RAWNAME);
        this.ID = `label-${this.NORMALIZED}`;
        this.FILTERID = `Filter-${this.NORMALIZED}`;

        this.SetupElement();
    }

    SetupElement() {
        this.ELEMENT.id = this.ID;
        this.ELEMENT.setAttribute('data-normalized', this.NORMALIZED);
        this.ELEMENT.setAttribute('data-name', this.NAME);
        this.ELEMENT.innerHTML = `<span>${this.RAWNAME}</span><i class="fa-solid fa-xmark label-Icon ms-4 me-1 "></i>`;
        this.ELEMENT.classList.add('labels', 'd-flex', 'align-items-center', 'justify-content-between',
                                    'positon-relative', 'rounded-4', 'ms-2', 'me-4', 'ps-3', 'pe-2', 'py-4' );
        this.ICON = this.ELEMENT.querySelector('.label-Icon');
        this.AddListeners();

    }
    
    /**
     * Récupère l'élément HTML représentant le label.
     * @returns {HTMLElement} - Retourne l'élément HTML du label avec l'icône de suppression associée.
     */
    getDom() {        
        this.AddListeners();        // Ajoute un écouteur d'événement sur l'icône pour supprimer le label lorsque l'utilisateur clique dessus
        return this.ELEMENT;
    }

    removeDom() {
        this.removeListeners();
        this.ELEMENT.remove();
    }

    Normalized() {
        return this.NORMALIZED;
    }

    /**
     * Ajoute un écouteur d'événement sur l'icône de suppression du label.
     */
    AddListeners() {
        this.ICON.addEventListener('click', (e) => {
            e.stopPropagation();
            this.ELEMENT.remove();
            // const labels = Array.from(document.querySelectorAll('.labels'));
            // SearchFromDelete(ArrayofLabelsObject);
        });
    }

    removeListeners() {
        this.ICON.removeEventListener('click', (e) => {
            e.stopPropagation();
            this.ELEMENT.remove();
            // const labels = Array.from(document.querySelectorAll('.labels'));
            // SearchFromDelete(ArrayofLabelsObject);
        });
    }
}

// Exportation de la classe Label pour la rendre disponible dans d'autres fichiers
export { Label };
