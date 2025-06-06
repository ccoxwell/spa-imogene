import { makeElementWithText } from "../utils/dom-tools.js"
import { removeGuest } from "../services/Guests.js"

export default class GuestList extends HTMLElement {
    static observedAttributes = ["data-guests"]
    constructor() {
        super()
        this.root = this.attachShadow({mode: "open"})
        this.eventSource = new EventSource("/events/new-guest-event")        
        this.eventSource.addEventListener("message", e => {
            let {guestList} = JSON.parse(e.data)
            app.store.guests = [...guestList]
            this.dataset.guests = JSON.stringify(guestList)
        })
    }

    connectedCallback() {
        this.render()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render()
    }
    disconnectedCallback() {
        console.log("closing event stream")
        this.eventSource.close();
    }

    render() {
        this.root.innerHTML = ""
        const content = $temp("guest-list")
        const ol = content.querySelector("ol")
        const guests = JSON.parse(this.dataset.guests)
        const olFrag = this.createOlFragment(guests)
        ol.appendChild(olFrag)
        content.appendChild(ol)
        this.root.appendChild(content)
    }

    createOlFragment(guests) {
        const frag = document.createDocumentFragment()
        guests.forEach(guest => {
            const li = this.createLi(guest)
            frag.appendChild(li)
        })
        return frag
    }

    createLi(guest) {
        const li = document.createElement("li")
        const nameSpan = makeElementWithText("span", guest.name)
        const trashSpan = document.createElement("span")
        const trashLink = makeElementWithText("a", "🗑️")
        trashLink.href = "#"
        trashLink.addEventListener("click", async (e) => {
            e.preventDefault()
            await removeGuest(guest.id)
            this.dataset.guests = JSON.stringify([...app.store.guests])
        })
        trashSpan.appendChild(trashLink)
        li.appendChildren([nameSpan, trashSpan])

        return li
    }
}

customElements.define("guest-list", GuestList)