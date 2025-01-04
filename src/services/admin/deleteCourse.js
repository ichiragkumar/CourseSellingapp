
import Course from "../../models/courseSchema.js";
import User from "../../models/userSchema.js";

export const DeleteCourse = async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if(user.role !== "ADMIN") return res.status(401).json({ message: "Unauthorized" });
    
    try {
        const course = await Course.findById(req.params.id);
        course.isActive = false;
        await course.save();
        res.status(200).json({msg:"Course Deleted"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
}   