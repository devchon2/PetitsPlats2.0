/* eslint-disable import/prefer-default-export */

// Importation du module depuis un autre fichier
import { getNormalized } from '../controllers/RecipesController.js';

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
        this.normalizedName = getNormalized(this.id);
        this.labelName = this.id.toUpperCase().charAt(0) + this.id.slice(1);

        // Crée le code HTML pour le label
        this.html = `<span>${this.labelName}</span>
                    <i class="hidden fa-solid fa-xmark label-icon ms-4 me-1 "></i>
                    `;

        // Crée l'élément de label en tant que div avec les classes spécifiées
        this.labelElement = document.createElement('div');
        this.labelElement.classList.add('labels', 'd-flex', 'align-items-center', 'justify-content-between', 'positon-relative', 'rounded-4', 'ms-2', 'me-4', 'ps-3', 'pe-2', 'py-4');
        this.labelElement.id = `label-${this.normalizedName}`;

        // Ajoute le code HTML au contenu de l'élément de label
        this.labelElement.innerHTML = `${this.html}`;

        // Sélectionne l'icône du label
        this.labelIcon = this.labelElement.querySelector('.label-icon');

        // Sélectionne l'élément de filtre associé à ce label
        this.filter = document.querySelector(`#Filter-${this.normalizedName}`);

        // Ajoute un écouteur d'événement sur l'icône pour supprimer le label lorsque l'utilisateur clique dessus
        this.addListener();
    }

    /**
     * Récupère l'élément HTML représentant le label.
     * @returns {HTMLElement} - Retourne l'élément HTML du label avec l'icône de suppression associée.
     */
    getDom() {
        return this.labelElement;
    }

    /**
     * Ajoute un écouteur d'événement sur l'icône de suppression du label.
     */
    addListener() {
        this.labelIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            this.filter.innerHTML = `${this.id}`;
            this.filter.classList.remove('active');
            this.labelElement.remove();
        });
    }
}

// Exportation de la classe Label pour la rendre disponible dans d'autres fichiers
export { Label };
