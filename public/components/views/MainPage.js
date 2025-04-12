export default class MainPage extends HTMLElement {
    constructor() {
        super()
        const content = $temp("main-page")
        const styles = document.createElement("style")
        this.root = this.attachShadow({mode: "open"})
        this.root.appendChild(content)
        this.root.appendChild(styles)

        async function loadCSS() {
            const request = await fetch("/components/views/MainPage.css")
            styles.textContent = await request.text();
        }
        loadCSS()
    }
}

customElements.define("main-page", MainPage)