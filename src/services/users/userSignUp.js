
import User from "../../models/userSchema.js";
import jwt from "jsonwebtoken";

export const UserSignup = async (req, res) => {
 const { name, email, password } = req.body;
  try {
  
    const user = await User.create({ name, email, password });

    const token = jwt.sign(
      { 
          id: user._id,
          role: user.role,
          iat: Math.floor(Date.now() / 1000)
      }, 
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
  );
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};