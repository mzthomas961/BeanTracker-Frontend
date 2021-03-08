// Global Variables
const coffeeUrl = 'http://localhost:3000/coffees'

const menu = document.querySelector('div#menu')

// Fetch Functions

function getAllCoffees() {
    fetch(coffeeUrl)
    .then(response => response.json())
    .then(coffees =>{
        getOneCoffee(coffees)
    })
}

// Rendering Logic

function getOneCoffee(coffees) {
    coffees.forEach(coffee => {
        renderAllCoffees(coffee)
    })
}

function renderAllCoffees(coffee) {
    image = document.createElement('img')
    image.src = coffee.image
    image.dataset.id = coffee.id
    menu.append(image)
}

function renderCoffeeObj(coffee){
    detail.querySelector("img.detail-image").src = coffee.image
    detail.querySelector("h2.name").textContent = coffee.name
    // form.querySelector("textarea#comment").value = ramen.comment
    // form.dataset.id = ramen.id
}

// Event Handlers

function handleMenuClick(e) {
    if (e.target.tagName === 'IMG') {
        fetch(`${coffeeUrl}/${e.target.dataset.id}`)
        .then(response => response.json())
        .then(coffee => renderCoffeeObj(coffee))
    }
}

// Event Listeners

menu.addEventListener('click', handleMenuClick)

// Initialize

getAllCoffees()
