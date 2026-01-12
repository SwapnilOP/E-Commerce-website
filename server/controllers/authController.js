import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// login 
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      token:generateToken(user._id,user.role),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// signup
export const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    
    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
      name,
      email,
      password:hashedPassword,
    });

    res.status(201).json(
      {
        message:"User registered successfully",
        token: generateToken(user._id,user.role),
        user:{
          id:user._id,
          name:user.name,
          email:user.email,
          role:user.role,
        },
      }
    )
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};