const Store = {
    guests: []
}

const proxiedStore = new Proxy(Store, {
    set(target, property, value) {
        target[property] = value
        if (property == "guests") {
            window.dispatchEvent(new Event("guestlistchange"))
        }
        return true
    }
})

export default proxiedStore