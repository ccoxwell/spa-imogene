import API from "../../../services/API.js"

export default class SignInPage extends HTMLElement {
    
    constructor() {
        super()
        this.root = this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        this.render()
    }

    render() {
        const template = document.getElementById("sign-in-page")
        const content = template.content.cloneNode(true)
        const guestSubmitButton = content.getElementById("submit-guest")
        const nameInput = content.getElementById("name")
        guestSubmitButton.addEventListener("click", async function() {
            const name = nameInput.value
            await API.addGuest(name)
            nameInput.value = ""
        })
        this.root.appendChild(content)
    }

}

customElements.define("sign-in-page", SignInPage)