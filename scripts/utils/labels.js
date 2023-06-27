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
        this.labelElement = document.createElement('div') 

        
    }

    /** Récupère l'ID du label.
     * 
     * @returns {HTMLElement} Retourne un élément HTML "label" et ajoute un événement "click" sur l'icone pour supprimer le label.
     */
    getDom() {
        this.labelElement.innerHTML = `${this.html}`
        return this.labelElement
    }

    addListener(){
        const LabelIcon = this.labelElement.querySelector('.label-icon')
        LabelIcon.addEventListener('click', () => {
            const filter = document.querySelector(`#${this.id}.filterOption.active`)
            filter.classList.remove('active')
            filter.innerHTML = `${this.id}`
            this.labelElement.remove()
            
        })
    }
    
        

    
}


export { Label }