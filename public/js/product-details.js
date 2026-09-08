// Product price
const pricePerKg = 60;

// Starting quantity
let quantity = 1;

// Get HTML elements
const decreaseBtn = document.getElementById("decreaseBtn");
const increaseBtn = document.getElementById("increaseBtn");

const quantityElement = document.getElementById("quantity");
const totalPriceElement = document.getElementById("totalPrice");


// Function to update quantity and price
function updateProduct() {

    quantityElement.textContent = quantity;

    const total = quantity * pricePerKg;

    totalPriceElement.textContent = "₹" + total;
}


// PLUS BUTTON
increaseBtn.addEventListener("click", function () {

    quantity++;

    updateProduct();

});


// MINUS BUTTON
decreaseBtn.addEventListener("click", function () {

    if (quantity > 1) {

        quantity--;

        updateProduct();

    }

});


// Show initial values
updateProduct();