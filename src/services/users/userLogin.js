


import User from "../../models/userSchema.js";
import dotenv from "dotenv"; 
import jwt from "jsonwebtoken";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
export const UserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    if(user.role === "ADMIN"){
        const token = jwt.sign({ id: user._id },JWT_SECRET);
        res.status(200).json({ token });
        return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};