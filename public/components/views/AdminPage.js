export default class AdminPage extends HTMLElement {
    constructor() {
        super()
        this.root = this.attachShadow({mode: "open"})
        this.guests = [...app.store.guests];

    }

    async connectedCallback() {
        this.render()
        
    }


    render() {
        const content = $temp("admin-page")
        const guestListComponent = document.createElement("guest-list")
        guestListComponent.classList.add("content")
        guestListComponent.dataset.guests = JSON.stringify(this.guests);
        content.appendChild(guestListComponent)
        this.root.appendChild(content)
    }
}

customElements.define("admin-page", AdminPage)