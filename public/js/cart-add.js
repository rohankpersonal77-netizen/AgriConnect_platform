const addToCartBtn = document.getElementById("addToCartBtn");
const cartMessage = document.getElementById("cartMessage");

console.log("cart-add.js loaded");

if (addToCartBtn) {

    addToCartBtn.addEventListener("click", function () {

        console.log("Add to Cart clicked");

        const name = document
            .querySelector(".details-content h1")
            .textContent
            .trim();

        const priceText = document
            .querySelector(".details-price")
            .textContent;

        const price = Number(
            priceText.replace(/[^\d]/g, "")
        );

        const quantity = Number(
            document
                .getElementById("quantity")
                .textContent
                .trim()
        );


        const product = {
            name: name,
            price: price,
            quantity: quantity
        };


        // Get old cart
        let cart = JSON.parse(
            localStorage.getItem("agriCart")
        );


        // IMPORTANT:
        // Convert old single product into an array
        if (!cart) {

            cart = [];

        } else if (!Array.isArray(cart)) {

            cart = [cart];

        }


        // Check whether product already exists
        const existingProduct = cart.find(
            item => item.name === product.name
        );


        if (existingProduct) {

            existingProduct.quantity += quantity;

        } else {

            cart.push(product);

        }


        // Save cart
        localStorage.setItem(
            "agriCart",
            JSON.stringify(cart)
        );


        // Show message
        cartMessage.textContent =
            "✅ " + name + " added to cart!";


        console.log("Cart:", cart);

    });

}