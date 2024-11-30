import User from "../Models/UserSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => { 
  const { email, password, name, role, gender } = req.body;
  console.log(req.body);


  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    

    
   
    const hashedPassword = await bcrypt.hash(password, 12);


      user = new User({
        email,
        password: hashedPassword,
        name,
        gender,
      });
    
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_key,
      {
        expiresIn: "15d",
      }
    );
    const { password: userPassword, ...rest } = user._doc;
    res.status(200)
      .json({
        status: "true",
        message: "User logged in successfully",
        token,
        user: { ...rest },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Failed to login" });
  }
};
