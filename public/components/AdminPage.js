export default class AdminPage extends HTMLElement {
    constructor() {
        super()
        this.root = this.attachShadow({mode: "open"})
        this.guests = [...app.store.guests];
    }

    async connectedCallback() {
        this.render()

        const eventSource = new EventSource("/guest-updates")
        eventSource.onmessage = event => {
            console.log(event.data)
        }

        // const response = await fetch("/guest-updates", {
        //     headers: {
        //       "Accept": "text/event-stream",
        //     },
        //   });
        
        //   if (!response.ok) {
        //     throw Error(response.statusText());
        //   }

        //   console.log(await response.json())
        
        //   for (const reader = response.body.getReader(); ; ) {
        //     const {value, done} = await reader.read();
        
        //     if (done) {
        //       break;
        //     }
        
        //     const chunk = new TextDecoder().decode(value);
        //     const subChunks = chunk.split(/(?<=})\n\ndata: (?={)/);
        
        //     for (const subChunk of subChunks) {
        //       const payload = subChunk.replace(/^data: /, "");
        //       console.log(JSON.parse(payload).chunk) ;
        //     }
        //   }

        window.addEventListener("guestlistchange", () => {
            this.guests = app.store.guests;
            this.shadowRoot.innerHTML = ""
            this.render()
        })
    }

    render() {
        const content = $temp("admin-page")
        const guestListComponent = document.createElement("guest-list")
        guestListComponent.dataset.guests = JSON.stringify(this.guests);
        content.appendChild(guestListComponent)
        this.root.appendChild(content)
    }
}

customElements.define("admin-page", AdminPage)