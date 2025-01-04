


import Admin from "../../models/adminSchema.js";

import dotenv from "dotenv"; 
import jwt from "jsonwebtoken";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
export const AdminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: 86400,
    });
    res.status(200).json({ token });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};