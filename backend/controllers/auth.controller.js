import User from "../models/user.model.js";
import validator from "validator";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import bcrypt from 'bcryptjs';


export const signup = async (req,res) => {
    try {
        const {fullName, username, email, password} = req.body;

        // Check if all fields are provided
        if (!username || !email || !password || !fullName) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists." });
        }

        // Create new user
        const newUser = new User({ fullName, username, email, password });

        await newUser.save();

        generateTokenAndSetCookie(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            email: newUser.email,
            message: "User created successfully",
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const login = async (req,res) => {
   try{
    const {username, password} = req.body

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

 // Check if the user exists in the database
 const user = await User.findOne({ username });
 if (!user) {
     return res.status(400).json({ message: "User not found." });
 }

  // Verify password using bcrypt
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials." });
  }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
    });

   } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again later." });
}
};

export const logout = async (req,res) => {
    try {
        // Clear the token cookie with proper settings
        res.clearCookie("jwt", {
            httpOnly: true, // ensures the cookie can't be accessed through JavaScript
            secure: process.env.NODE_ENV === "production", // ensures the cookie is sent over HTTPS only in production
            sameSite: "strict", // prevents the cookie from being sent with cross-origin requests
            maxAge: 0, // Immediately expires the cookie
        });

        // Send a success response
        res.status(200).json({ message: "Logged out successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};