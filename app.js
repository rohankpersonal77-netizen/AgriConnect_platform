const express = require("express");
const mongoose = require("mongoose");
const product = require("./models/Product");
const User = require("./models/User");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/agriconnect")
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });


// ================= PRODUCTS =================

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


const PORT = 8080;


// ================= SETTINGS =================

app.set("view engine", "ejs");

app.use(express.static("public"));


// ================= HOME =================

app.get("/", (req, res) => {
    res.render("home", {
        featuredProducts: products
    });
});

// ================= ABOUT =================

app.get("/about", (req, res) => {
    res.render("about");
});

// ================= CONTACT =================

app.get("/contact", (req, res) => {
    res.render("contact", {
        success: null
    });
});

app.post("/contact", (req, res) => {
    const { name, email, phone, userRole, subject, message } = req.body;
    console.log("Contact form submission received:", { name, email, phone, userRole, subject, message });
    
    res.render("contact", {
        success: "Thank you, " + (name || "there") + "! Your message has been received. Our support team will get back to you shortly."
    });
});


// ================= PRODUCTS =================

app.get("/products", (req, res) => {
    const searchQuery = req.query.search;
    let filteredProducts = products;

    if (searchQuery) {
        filteredProducts = products.filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    res.render("products", {
        products: filteredProducts
    });
});

// ================= PRODUCT DETAILS =================

app.get("/products/:name", (req, res) => {
    const productName = req.params.name;

    const productItem = products.find(
        item => item.name.toLowerCase() === productName.toLowerCase()
    );

    if (!productItem) {
        return res.status(404).send("Product not found");
    }

    res.render("product-details", {
        product: productItem
    });
});


// ================= CART =================

app.get("/cart", (req, res) => {
    res.render("cart");
});


// ================= AUTHENTICATION (LOGIN & REGISTER) =================

// GET Login Page
app.get("/login", (req, res) => {
    res.render("login", {
        error: null,
        success: req.query.registered ? "Registration successful! Please log in to your account." : null
    });
});

// POST Login Handler
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Quick handle for demo credentials
        if (
            (email === "farmer.demo@agriconnect.org" && password === "farmer123") ||
            (email === "buyer.demo@agriconnect.org" && password === "buyer123")
        ) {
            return res.render("home", {
                user: { email, role: email.includes("farmer") ? "farmer" : "buyer" }
            });
        }

        // Check MongoDB if connected
        if (mongoose.connection.readyState === 1) {
            const user = await User.findOne({ email: email.toLowerCase().trim() });
            if (!user || user.password !== password) {
                return res.status(400).render("login", {
                    error: "Invalid email or password. Please try again.",
                    success: null
                });
            }
            return res.render("home", { user });
        }

        // Demo fallback if MongoDB is not running locally
        return res.render("home", {
            user: { email, role: "user" }
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).render("login", {
            error: "An unexpected error occurred. Please try again later.",
            success: null
        });
    }
});

// GET Register Page
app.get("/register", (req, res) => {
    res.render("register", {
        error: null
    });
});

// POST Register Handler
app.post("/register", async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword, role, phone, farmLocation, address } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).render("register", {
                error: "Passwords do not match. Please try again."
            });
        }

        // Check MongoDB if connected
        if (mongoose.connection.readyState === 1) {
            const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
            if (existingUser) {
                return res.status(400).render("register", {
                    error: "An account with this email already exists. Please log in."
                });
            }

            const newUser = new User({
                fullName,
                email: email.toLowerCase().trim(),
                password, // In production app, use bcrypt hashing
                role: role || "buyer",
                phone,
                farmLocation,
                address
            });

            await newUser.save();
        }

        res.redirect("/login?registered=true");
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).render("register", {
            error: "Registration failed. Please check your information and try again."
        });
    }
});


// ================= SERVER =================

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});