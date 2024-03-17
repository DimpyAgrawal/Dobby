const express = require('express');
const app = express();
const router = express.Router();
const bcrypt  =  require('bcrypt');
const User  = require('../model/User');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/middleware')

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


router.post("/register", async (req, res) => {
    // Logging
    console.log("User registration initiated");

    // Extracting data from request body
    const { name, email, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please provide all required fields" });
    }

    // Encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        // Check if user with provided email already exists
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        // console.log(User.find({}));
        const newUser = await User.create({
            name,
            email,
            password: encryptedPassword
        });

        // Send success response
        return res.status(200).json({ success: "User registered successfully" });
    } catch (error) {
        // Handle errors
        console.error("Error registering user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: "User Not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email, role: user.role, name: user.name }, process.env.JWT_SECRET);
        return res.json({ status: "ok", message: "Login Successfully", data: token });
    }
    return res.json({ status: "error", error: "Invalid Authentication" });
});
 



module.exports = router;