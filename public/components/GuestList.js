import { makeElementWithText } from "../utils/dom-tools.js"
import { removeGuest } from "../services/Guests.js"

export default class GuestList extends HTMLElement {
    constructor() {
        super()
        this.root = this.attachShadow({mode: "open"})
        this.guests = this.dataset.guests
    }

    connectedCallback() {
        this.render()
    }

    render() {
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
        const statusSpan = makeElementWithText("span", guest.status)
        const trashSpan = document.createElement("span")
        const trashLink = makeElementWithText("a", "🗑️")
        trashLink.href = "#"
        trashLink.addEventListener("click", async (e) => {
            e.preventDefault()
            await removeGuest(guest.id)
        })
        trashSpan.appendChild(trashLink)
        li.appendChildren([nameSpan, statusSpan, trashSpan])

        return li
    }
}

customElements.define("guest-list", GuestList)