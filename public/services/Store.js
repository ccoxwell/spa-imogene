const Store = {
    guests: []
}

const proxiedStore = new Proxy(Store, {
    set(target, property, value) {
        target[property] = value
        return true
    }
})

export default proxiedStore