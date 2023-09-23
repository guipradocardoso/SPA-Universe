export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()
    window.history.pushState({}, "", event.target.href)
    this.bgChange()
    this.handle()
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]
    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html
      })
  }

  bgChange() {
    const { pathname } = window.location

    let body = document.body

    body.style.backgroundImage
    switch (pathname) {
      case "/universe":
        body.style.backgroundImage = "url(./assets/images/universe.svg)"

        break
      case "/exploration":
        body.style.backgroundImage = "url(./assets/images/exploration.svg)"

        break
      default:
        // Define um background padrão para outras páginas
        body.style.backgroundImage = "url(./assets/images/home.svg)"
        break
    }
  }
}
