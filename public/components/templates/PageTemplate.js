export default class PageTemplate extends HTMLElement {
    constructor(tag, stylesUrl) {
        super();
        const content = $temp(tag)
        const styles = document.createElement("style")
        this.root = this.attachShadow({mode: "open"})
        this.root.appendChild(content)
        this.root.appendChild(styles)
        this.root.classList.add("hello")

        async function loadCSS() {
            const request = await fetch(stylesUrl)
            styles.textContent = await request.text()
        }
    }
}