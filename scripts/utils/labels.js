/* eslint-disable import/prefer-default-export */
class Label {
    constructor(id) {
        this.id = id
        
    }

    getDom() {
        
        const element = document.createElement('div')
        element.classList.add('labels')
        element.id = `label-${this.id}`
        const content = document.createElement('span')
        const icon = '<i class="fa-solid fa-xmark label-icon"></i>'
        content.innerHTML = this.id + icon
        element.appendChild(content)
        const icone = element.querySelector('i')
        icone.addEventListener('click', () => {
            element.remove()
        })



        return element
    }

    
}


export { Label }