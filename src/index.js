// Global Variables
const coffeeUrl = 'http://localhost:3000/coffees'

const menu = document.querySelector('div#menu')
const commentForm = document.querySelector('form#coffee-comment')

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
    commentForm.dataset.id = coffee.id
}

// Event Handlers

function handleMenuClick(e) {
    if (e.target.tagName === 'IMG') {
        fetch(`${coffeeUrl}/${e.target.dataset.id}`)
        .then(response => response.json())
        .then(coffee => renderCoffeeObj(coffee))
    }
}
function handleFormSubmission(e){
    e.preventDefault()
    const comment = e.target[0].value
    fetch(`${coffeeUrl}/${commentForm.dataset.id}`,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(commentO)
    })
    .then(response => response.json())
    .then(comment => {
        console.log(comment)})
}

// Event Listeners

menu.addEventListener('click', handleMenuClick)
commentForm.addEventListener('submit', handleFormSubmission)

// Initialize

getAllCoffees()
