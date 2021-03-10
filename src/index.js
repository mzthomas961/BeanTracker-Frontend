// Global Variables
const coffeeUrl = 'http://localhost:3000/coffees'
const orderUrl ='http://localhost:3000/orders'

const menu = document.querySelector('div#menu')
const commentForm = document.querySelector('form#coffee-comment')
const cart = document.querySelector("ol#cart")


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
        cart.innerHTML += `<li class = "order" id = ${order.id}>
        <h2> Coffee: ${coffee.name} </h1>
        <label for="note"> Note: </label>
        <textarea name="note" id="note"> ${order.note} </textarea>
        <h4> Date/Time: ${order.date} </h2>
        <button class = "update-btn" id = ${order.id}> Update </button>
        <button class = "delete-btn" id = ${order.id}> Delete </button>
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
// 
function handleFormSubmission(e) {
    e.preventDefault()
    note = e.target[0].value
    date = e.target[1].value
    user_id = 1
    coffee_id = e.target.dataset.id

    fetch(orderUrl,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({note:note, date:date, user_id:1, coffee_id:coffee_id})
    })
    .then(r => r.json())
    .then(newOrder => console.log(newOrder))
    
}
function handleDeleteButton(e){
    if (e.target.matches(".delete-btn"))
     orderLi = e.target.closest("li")
     id = e.target.id
    orderLi.remove()
    fetch(`${orderUrl}/${id}`)
    .then(response => response.json())
    .then(order => console.log(order))
}

function

// Event Listeners

menu.addEventListener('click', handleMenuClick)
commentForm.addEventListener('submit', handleFormSubmission)
cart.addEventListener('click', handleDeleteButton)
cart.addEventListener('click', handleUpdateButton)

// Initialize

getAllCoffees()
getAllOrders()



// test
