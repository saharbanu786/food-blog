const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSignUp = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password is required" });
    }
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ error: "Email already exists" });
    }
    const hashPwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashPwd });
    const token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY);
    return res.status(200).json({ token, user: newUser });
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password is required" });
    }
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY);
        return res.status(200).json({ token, user });
    } else {
        return res.status(400).json({ error: "Invalid credentials" });
    }
};

const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ email: user.email });
    } catch (error) {
        console.error("Error fetching user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { userLogin, userSignUp, getUser };
