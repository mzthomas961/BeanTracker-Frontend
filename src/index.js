window.addEventListener("DOMContenLoaded", (event) =>{
})

function renderAllCoffees(){
    fetch("http://localhost:3000/coffees")
    .then(response => response.json())
    .then(coffees =>{
        console.log(coffees)
    })
}
renderAllCoffees()
