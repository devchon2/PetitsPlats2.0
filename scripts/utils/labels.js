/* eslint-disable import/prefer-default-export */

/** Classe représentant un label.
 * @class Label
 * 
 */
class Label {
    constructor(id) {
        this.id = id
        this.html = `<div class="labels" id="label-${this.id}">
                        <span>${this.id}</span>
                        <i class="hidden fa-solid fa-xmark label-icon"></i>
                    </div>`


        
    }

    /** Récupère l'ID du label.
     * 
     * @returns {HTMLElement} Retourne un élément HTML "label" et ajoute un événement "click" sur l'icone pour supprimer le label.
     */
    getDom() {
        const labelElement = document.createElement('div') 
        labelElement.innerHTML = `${this.html}`
        const LabelIcon = labelElement.querySelector('.label-icon')
        LabelIcon.addEventListener('click', () => {
            const filter = document.querySelector(`#${this.id}.filterOption.active`)
            filter.classList.toggle('active')
            filter.innerHTML = `${this.id}`
            labelElement.remove()
            
        })
    
        return labelElement
    }

    
}


export { Label }