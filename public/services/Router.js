const Router = {
    init: () => {
        document.querySelectorAll("a.navlink").forEach(a => {
            a.addEventListener("click", event => {
                event.preventDefault()
                const url = event.target.getAttribute("href")
                Router.go(url)
            })
        })
        window.addEventListener("popstate", event => {
            Router.go(event.state.route, false);
        })
        Router.go(location.pathname)
    },
    go: (route, addToHistory=true) => {
        console.log(`going to ${route}`);

        if (addToHistory) {
            history.pushState({route}, '', route);
        }
        let pageElement = null;
        switch(route) {
            case "/":
                pageElement = document.createElement("main-page")
                break;
            case "/admin":
                pageElement = document.createElement("admin-page")
                break;
            case "/signin":
                console.log(document)
                pageElement = document.createElement("sign-in-page")
        }
        if (pageElement) {
            const cache = document.querySelector("main")
            cache.innerHTML = "";
            cache.appendChild(pageElement);
            window.scrollX = 0;
            window.scrollY = 0;
        } else {
            document.querySelector("main").innerHTML = "oops, 404!"
        }
    }
}

export default Router;