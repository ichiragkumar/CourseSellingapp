import Course from "../../models/courseSchema.js";

export const AllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isActive: true });
        res.status(200).json(courses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
}   