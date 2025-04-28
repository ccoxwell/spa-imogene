export default class AdminPage extends HTMLElement {
    constructor() {
        super()
        this.root = this.attachShadow({mode: "open"})
        this.guests = [...app.store.guests];
        this.eventSource = new EventSource("/events/new-guest-event")        
        this.eventSource.addEventListener("message", e => {
            console.log(`client: new user added at ${Date.now()}`)
            console.log(e.data)
            let {guestList} = JSON.parse(e.data)
            app.store.guests = [...guestList]
            this.guests = [...app.store.guests];
            console.log(this.guests)
            // let guestListComponent = this.renderData()
            // this.appendChild(guestListComponent)
            let guestListEl = document.querySelector("guest-list")
            console.log(guestListEl)
        })
    }

    async connectedCallback() {
        this.render()
        
    }


    disconnectedCallback() {
        console.log("closing event stream")
        this.eventSource.close();
    }

    render() {
        const content = $temp("admin-page")
        const guestListComponent = this.renderData();
        content.appendChild(guestListComponent)
        this.root.appendChild(content)
    }

    renderData() {
        if (document.querySelector("guest-list")) {
            console.log("there is a guest list")
            document.querySelector("guest-list").remove()
        }
        const guestListComponent = document.createElement("guest-list")
        guestListComponent.classList.add("content")
        guestListComponent.dataset.guests = JSON.stringify(this.guests);
        return guestListComponent
    }
}

customElements.define("admin-page", AdminPage)