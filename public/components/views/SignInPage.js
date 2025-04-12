import API from "../../../services/API.js"

export default class SignInPage extends HTMLElement {
    
    constructor() {
        super()
        console.log("creating sign in page")
        this.root = this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        console.log("rendering")
        this.render()
    }

    render() {
        const template = document.getElementById("sign-in-page")
        console.log(template)
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