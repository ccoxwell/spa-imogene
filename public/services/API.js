const API = {
    deleteGuestUrl: "/api/delete-guest",
    deleteGuest: async function(id) {
        await fetch(this.deleteGuestUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({guestId: id})
        })
    },
    fetchGuestsUrl: "/api/list-guests",
    fetchGuests: async function() {
        const response = await fetch(this.fetchGuestsUrl)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const guests = await response.json()
        return guests
    },
    addGuestUrl: "/api/add-guest",
    addGuest: async function(name) {
        const response = await fetch(this.addGuestUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name})
        })
        const guests = await response.json()
        app.store.guests = guests;
        return guests;
    },
    removeGuestUrl: "/api/delete-guest",
    removeGuest: async function(id) {
        const response = await fetch(this.removeGuestUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })
        const guests = await response.json()
        app.store.guests = [...app.store.guests].filter(guest => guest.id != id)
        return guests;

    }
}

export default API