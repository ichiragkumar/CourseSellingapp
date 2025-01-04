
import Admin from "../../models/adminSchema.js";
export const AdminSignup = async (req, res) => {
 const { name, email, password, role } = req.body;
  try {
    if(role !== "ADMIN"){
        return res.status(400).json({ message: "Invalid Role" });
    }
    const user = await Admin.create({ name, email, password,role });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};