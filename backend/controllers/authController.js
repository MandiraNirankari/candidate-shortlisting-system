const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// ======================
// Signup
// ======================
const signup = async (req, res) => {

    try {

        const { name, email, password } = req.body;


        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const user = new User({
            name,
            email,
            password: hashedPassword
        });


        await user.save();


        res.status(201).json({
            message: "Signup successful"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};


// ======================
// Login
// ======================
const login = async (req, res) => {

    try {

        const { email, password } = req.body;


        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "Invalid email"
            });

        }


        const isMatch = await bcrypt.compare(
            password,
            user.password
        );


        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid password"
            });

        }


        const token = jwt.sign(
            {
                id: user._id
            },
            "secretkey",
            {
                expiresIn: "1d"
            }
        );


        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};


module.exports = {
    signup,
    login
};