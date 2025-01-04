import Course from "../../models/courseSchema.js";

export const AdminAllCourses = async (req, res) => {
    const { useremail } = req.headers;
    if (!useremail) return res.status(400).json({ message: "Email is required" });
    try {
        const courses = await Course.find({ adminEmail: useremail });
        console.log(courses);
        res.status(200).json(courses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
}   