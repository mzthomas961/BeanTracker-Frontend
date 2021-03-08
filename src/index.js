// Global Variables
const menu = document.querySelector('div#menu')

// Fetch Functions

function getAllCoffees() {
    fetch("http://localhost:3000/coffees")
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
    menu.innerHTML += `<img src=${coffee.image}>`
}

// Event Handlers

// Initialize

getAllCoffees()
