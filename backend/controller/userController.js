const validator = require("validator");
const bycrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// User Registration
exports.registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        //Checking user already exists or not
        const exists = await userModel.findOne({email});
        
        if (exists) {
            return res.json({success: false, message: "User already exists"})
        } 

        // Validating email format 
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email"})
        }
        // Validating strong password
        if (password.length < 8) {
            return res.json({success: false, message: "Please enter a strong password with at least 8 characters"})
        }

        // Hashing user password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        })

        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({success:true, token})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
};

// User Login
exports.loginUser = async (req, res) => {
    try {
        
        const { email, password } = req.body;
        
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success: false, message: "User does not exists"})
        }

        const isMatch = await bycrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            res.json({success: true, token, username: user.name})
        } else {
            res.json({success: false, message: "Invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
};

// Admin Login
exports.adminLogin = async (req, res) => {
    try {
        
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success: true, token})
        } else {
            res.json({success: false, message: "Invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}   

// Get user profile
exports.getUser = async (req, res) => {

}

// Update user profile
exports.updateUser = async (req, res) => {

}

//Logout User
exports.logoutUser = async (req, res) => {
    
}

// Forgot password
exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Hash new password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.json({ success: true, message: "Password reset successful" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
