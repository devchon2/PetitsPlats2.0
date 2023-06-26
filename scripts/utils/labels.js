/* eslint-disable import/prefer-default-export */

/** Classe représentant un label.
 * @class Label
 * 
 */
class Label {
    constructor(id) {
        this.id = id
        this.element.innerHTML = `<div class="labels" id="label-${this.id}">
                                    <span>${this.id}</span>
                                        <i class="hidden fa-solid fa-xmark label-icon">
                                        </i>
                                    </div>`

        
    }

    /** Récupère l'ID du label.
     * 
     * @returns {HTMLElement} Retourne un élément HTML "label" et ajoute un événement "click" sur l'icone pour supprimer le label.
     */
    getDom() {
        const labelElement = this.element
        labelElement.queryselector('.label-icon').addEventListener('click', () => {
            labelElement.remove()
        })
    
        return labelElement
    }

    
}


export { Label }