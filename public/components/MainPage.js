export default class MainPage extends HTMLElement {
    constructor() {
        super()
        this.root = this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this.render()
    }

    render() {
        const content = $temp("main-page")
        this.root.appendChild(content)
    }
}

customElements.define("main-page", MainPage)