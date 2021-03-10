// Global Variables
const coffeeUrl = 'http://localhost:3000/coffees'
const orderUrl ='http://localhost:3000/orders'

const menu = document.querySelector('div#menu')
const commentForm = document.querySelector('form#coffee-comment')
const cart = document.querySelector("ul#cart")

// Fetch Functions

function getAllCoffees() {
    fetch(coffeeUrl)
    .then(response => response.json())
    .then(coffees =>{
        getOneCoffee(coffees)
    })
}
function getAllOrders(){
    fetch(orderUrl)
    .then(response => response.json())
    .then(orders =>{
        getOneOrder(orders)
    })
}

function createOrder(order){
    fetch(orderUrl, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({order})
    })
        .then(response => console.log(response.json()))
        //.then(newOrder => console.log(newOrder))

}

// Rendering Logic
function getOneOrder(orders){
    orders.forEach(order => {
        renderAllOrders(order)
    })
}

function renderAllOrders(order){
    id = order.coffee_id
    fetch(`${coffeeUrl}/${id}`)
    .then(r => r.json())
    .then(coffee => {
        cart.innerHTML += `<li id = ${order.id}>
        <h2> Coffee: ${coffee.name} </h1>
        <h2> Note: ${order.note} </h2>
        <h4> Date/Time: ${order.date} </h2>
        </li>`
    })

}
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

function handleFormSubmission() {
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault()
        let order = {
            note:e.target[0].value,
            date:e.target[1].value,
            coffee_id:e.target.dataset.id,
            user_id:1
        }
        createOrder(order)
    })
}

// Event Listeners

menu.addEventListener('click', handleMenuClick)

// Initialize

getAllCoffees()
getAllOrders()
handleFormSubmission()
// test