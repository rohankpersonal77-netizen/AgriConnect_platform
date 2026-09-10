const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [

    // ================= FRUITS =================

    {
        name: "Guava",
        price: 60,
        category: "Fruits",
        image: "/images/guava.jpeg",
        description: "Fresh and naturally grown guava directly from local farmers."
    },

    {
        name: "Apple",
        price: 120,
        category: "Fruits",
        image: "/images/apple.jpeg",
        description: "Fresh and crispy apples sourced from quality farms."
    },

    {
        name: "Banana",
        price: 50,
        category: "Fruits",
        image: "/images/banana.jpeg",
        description: "Fresh naturally ripened bananas from local farmers."
    },

    {
        name: "Mango",
        price: 100,
        category: "Fruits",
        image: "/images/mango.jpeg",
        description: "Fresh and juicy seasonal mangoes directly from farmers."
    },

    {
        name: "Orange",
        price: 80,
        category: "Fruits",
        image: "/images/orange.jpeg",
        description: "Fresh juicy oranges with natural sweetness."
    },

    // ================= VEGETABLES =================

    {
        name: "Tomato",
        price: 40,
        category: "Vegetables",
        image: "/images/Tomato.jpeg",
        description: "Fresh farm tomatoes with excellent quality."
    },

    {
        name: "Potato",
        price: 35,
        category: "Vegetables",
        image: "/images/potato.jpeg",
        description: "Fresh potatoes sourced directly from farmers."
    },

    {
        name: "Onion",
        price: 45,
        category: "Vegetables",
        image: "/images/onion.jpeg",
        description: "Fresh quality onions from local farmers."
    },

    {
        name: "Carrot",
        price: 55,
        category: "Vegetables",
        image: "/images/carrot.jpeg",
        description: "Fresh and crunchy carrots grown by local farmers."
    },

    {
        name: "Cabbage",
        price: 30,
        category: "Vegetables",
        image: "/images/cappage.jpeg",
        description: "Fresh green cabbage directly from local farms."
    },

    // ================= DRY FRUITS =================

    {
        name: "Almond",
        price: 750,
        category: "Dry Fruits",
        image: "/images/almond.jpeg",
        description: "Premium quality almonds packed with natural nutrition."
    },

    {
        name: "Cashew",
        price: 850,
        category: "Dry Fruits",
        image: "/images/cashew.jpeg",
        description: "Premium fresh cashews with rich taste and quality."
    },

    {
        name: "Raisin",
        price: 350,
        category: "Dry Fruits",
        image: "/images/raisin.jpeg",
        description: "Naturally dried raisins with excellent taste."
    },

    // ================= NUTS =================

    {
        name: "Walnut",
        price: 900,
        category: "Nuts",
        image: "/images/walnut.jpeg",
        description: "Premium quality walnuts sourced from trusted farms."
    },

    {
        name: "Pistachio",
        price: 1000,
        category: "Nuts",
        image: "/images/pistachio.jpeg",
        description: "High-quality pistachios with a rich natural flavour."
    },

    // ================= GRAINS =================

    {
        name: "Wheat",
        price: 42,
        category: "Grains",
        image: "/images/wheat.jpeg",
        description: "Quality wheat supplied directly by local farmers."
    },

    {
        name: "Rice",
        price: 65,
        category: "Grains",
        image: "/images/rice.jpeg",
        description: "Premium quality rice sourced directly from farmers."
    },

    // ================= SPICES =================

    {
        name: "Red Chilli",
        price: 180,
        category: "Spices",
        image: "/images/chilli.jpeg",
        description: "Fresh quality red chilli from local farms."
    },

    {
        name: "Turmeric",
        price: 140,
        category: "Spices",
        image: "/images/turmeric.jpeg",
        description: "Natural turmeric with rich colour and flavour."
    }
];

async function seedDB() {

    try {

        await mongoose.connect(
            "mongodb://127.0.0.1:27017/agriconnect"
        );

        console.log("MongoDB connected successfully");

        await Product.deleteMany({});

        await Product.insertMany(products);

        console.log("19 products inserted successfully");

        await mongoose.connection.close();

    } catch (err) {

        console.log("Error:", err);

    }

}

seedDB();