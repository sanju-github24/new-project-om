import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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


export const signin = async (req, res, next) => {
  const {email,password} = req.body;
  try{
    const validUser = await User.findOne({email});
    if(!validUser) return next(errorHandler(404, "User not found"));
    const ValidPassword = bcryptjs.compareSync(password, validUser.password);
    if(!ValidPassword) return next(errorHandler(401, "wrong credentials"));
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
    const {password: hashedPassword, ...rest} = validUser._doc;
    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hour in milliseconds
      expires: new Date(Date.now() + 1000 * 60 * 60) // 1 hour from now
    }).status(200).json(rest);
  }catch (error){
    next(error);
  }
}