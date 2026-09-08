const cartContainer = document.getElementById("cartContainer");
const cartCount = document.getElementById("cartCount");
const subtotalElement = document.getElementById("subtotal");
const cartTotalElement = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");


// ================= LOAD CART =================

function getCart() {

    return JSON.parse(
        localStorage.getItem("agriCart")
    ) || [];

}


// ================= DISPLAY CART =================

function displayCart() {

    const cart = getCart();

    cartContainer.innerHTML = "";


    // EMPTY CART

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>🛒 Your Cart is Empty</h2>

                <p>
                    Add some fresh products from farmers.
                </p>

                <a href="/products">
                    Browse Products →
                </a>
            </div>
        `;

        cartCount.textContent = "0 items";

        subtotalElement.textContent = "₹0";

        cartTotalElement.textContent = "₹0";

        return;

    }


    let subtotal = 0;

    let totalItems = 0;


    // ================= CART ITEMS =================

    cart.forEach((product, index) => {

        const itemTotal =
            product.price * product.quantity;


        subtotal += itemTotal;

        totalItems += product.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <div class="cart-item-icon">
                    🌾
                </div>

                <div>

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ₹${product.price} / kg
                    </p>

                </div>

            </div>


            <div class="cart-quantity">

                <button
                    class="cart-minus"
                    data-index="${index}">
                    −
                </button>

                <span>
                    ${product.quantity} kg
                </span>

                <button
                    class="cart-plus"
                    data-index="${index}">
                    +
                </button>

            </div>


            <div class="cart-item-total">

                <strong>
                    ₹${itemTotal}
                </strong>

            </div>


            <button
                class="remove-cart-item"
                data-index="${index}">

                🗑️ Remove

            </button>

        `;


        cartContainer.appendChild(cartItem);

    });


    // ================= SUMMARY =================

    cartCount.textContent =
        `${totalItems} items`;


    subtotalElement.textContent =
        `₹${subtotal}`;


    cartTotalElement.textContent =
        `₹${subtotal}`;

}


// ================= PLUS =================

document.addEventListener("click", function (event) {

    if (event.target.classList.contains("cart-plus")) {

        const index =
            Number(event.target.dataset.index);


        const cart = getCart();


        cart[index].quantity += 1;


        localStorage.setItem(
            "agriCart",
            JSON.stringify(cart)
        );


        displayCart();

    }

});


// ================= MINUS =================

document.addEventListener("click", function (event) {

    if (event.target.classList.contains("cart-minus")) {

        const index =
            Number(event.target.dataset.index);


        const cart = getCart();


        if (cart[index].quantity > 1) {

            cart[index].quantity -= 1;

        }


        localStorage.setItem(
            "agriCart",
            JSON.stringify(cart)
        );


        displayCart();

    }

});



document.addEventListener("click", function (event) {

    if (
        event.target.classList.contains(
            "remove-cart-item"
        )
    ) {

        const index =
            Number(event.target.dataset.index);


        const cart = getCart();


        cart.splice(index, 1);


        localStorage.setItem(
            "agriCart",
            JSON.stringify(cart)
        );


        displayCart();

    }

});


// ================= CHECKOUT =================

checkoutBtn.addEventListener("click", function () {

    const cart = getCart();


    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    alert(
        "Checkout feature will be added next! 🛒"
    );

});


// ================= START =================

displayCart();