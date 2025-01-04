
import User from "../../models/userSchema.js";


export const UserSignup = async (req, res) => {
 const { name, email, password, role } = req.body;
  try {
    if(role !== "USER"){
        return res.status(400).json({ message: "Invalid Role" });
    }
    const user = await User.create({ name, email, password,role });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};