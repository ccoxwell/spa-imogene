import Store from "../services/Store.js"
import {getGuests} from "../services/Guests.js"
import MainPage from "./components/views/MainPage.js"
import SignInPage from "./components/views/SignInPage.js"
import AdminPage from "./components/views/AdminPage.js"
import GuestList from "./components/GuestList.js"
import Router from "../services/Router.js"

window.app = {}
app.store = Store;
app.router = Router;

window.$temp = templateId => {
    const template = document.getElementById(templateId)
    const content = template.content.cloneNode(true)
    return content;
}

window.addEventListener("DOMContentLoaded", async function() {
    app.router.init()
    await getGuests()
    
})

HTMLElement.prototype.appendChildren = function(arrayOfElements) {
    for (const el of arrayOfElements) {
        this.appendChild(el)
    }
    return this;
}

