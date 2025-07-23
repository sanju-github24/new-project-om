import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Hash password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create and save user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // Handle duplicate error
    if (error.code === 11000) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    console.error("Signup Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
