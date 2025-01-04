


import User from "../../models/userSchema.js";
import dotenv from "dotenv"; 
import jwt from "jsonwebtoken";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
export const UserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });
     const token = jwt.sign(
          { 
              id: user._id,
              role: user.role,
              iat: Math.floor(Date.now() / 1000)
          }, 
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
      );
    res.status(200).json({ token });

   

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};