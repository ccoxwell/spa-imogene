import API from "./API.js"

export async function getGuests() {
    app.store.guests = await API.fetchGuests()
}

export async function addGuest(name) {
    app.store.guests = await API.addGuest(name)
}

export async function removeGuest(id) {
    await API.removeGuest(id)
}