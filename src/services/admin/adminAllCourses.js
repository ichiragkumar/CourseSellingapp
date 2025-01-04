


import Course from "../../models/courseSchema.js";
import User from "../../models/userSchema.js";
export const AdminAllCourses = async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if(user.role !== "ADMIN"){
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const courses = await Course.find({ adminEmail: user.email });
        res.status(200).json(courses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
}   