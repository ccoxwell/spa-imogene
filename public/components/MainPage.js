export default class MainPage extends HTMLElement {
    constructor() {
        super()
        this.root = this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this.render()
    }

    render() {
        const template = document.getElementById("main-page")
        const content = template.content.cloneNode(true)
        this.root.appendChild(content)
    }
}

customElements.define("main-page", MainPage)