const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const searchInput = document.querySelector("#searchInput");


// Current selected category
let selectedCategory = "all";


// ================= FILTER PRODUCTS =================

function filterProducts() {

    const searchValue = searchInput.value.toLowerCase().trim();


    productCards.forEach(card => {

        const cardCategory =
            card.dataset.category.toLowerCase();

        const productName =
            card.querySelector("h2")
                .textContent
                .toLowerCase();

        const productDescription =
            card.querySelector("p")
                .textContent
                .toLowerCase();


        // Category check
        const categoryMatch =
            selectedCategory === "all" ||
            cardCategory === selectedCategory;


        // Search check
        const searchMatch =
            productName.includes(searchValue) ||
            productDescription.includes(searchValue);


        // Final result
        if (categoryMatch && searchMatch) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });


    // Check if any product is visible
    const visibleProducts =
        Array.from(productCards).some(
            card => card.style.display !== "none"
        );


    // No products message
    let noResult =
        document.querySelector("#noResult");


    if (!visibleProducts) {

        if (!noResult) {

            noResult = document.createElement("p");

            noResult.id = "noResult";

            noResult.textContent =
                "🔍 No products found.";

            noResult.style.textAlign = "center";

            noResult.style.fontSize = "20px";

            noResult.style.margin = "40px 0";

            document
                .querySelector("#productGrid")
                .appendChild(noResult);

        }

    } else {

        if (noResult) {

            noResult.remove();

        }

    }

}


// ================= CATEGORY FILTER =================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {


        // Remove active from all buttons

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        // Add active to clicked button

        button.classList.add("active");


        // Get category

        selectedCategory =
            button.dataset.category.toLowerCase();


        // Apply filter

        filterProducts();

    });

});


// ================= SEARCH =================

searchInput.addEventListener("input", () => {

    filterProducts();

});