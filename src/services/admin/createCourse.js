
import Course from "../../models/courseSchema.js";
import User from "../../models/userSchema.js";
export const CreateCourse = async (req, res) => {
    const userId = req.user.id;
    console.log(userId);
    const user = await User.findById(userId);
    if(user.role !== "ADMIN"){
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { name, description, price, expiryDate, courseType, imgUrl } = req.body;
    try {
        const course = await Course.create({ name, description, price, expiryDate, courseType, imgUrl });
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
}