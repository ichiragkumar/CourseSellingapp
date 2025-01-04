import Course from "../../models/courseSchema.js";
import User from "../../models/userSchema.js";


export const MyCourses = async (req, res) => {
    const { useremail } = req.headers;
    if (!useremail) {
        return res.status(400).json({ message: "User Email is required" });
    }
    try {
        const user = await User.findOne({ email: useremail });
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        const courses = await Course.find({ adminEmail: user.email });
        res.status(200).json(courses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
}