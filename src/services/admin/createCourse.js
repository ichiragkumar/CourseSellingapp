
import Course from "../../models/courseSchema.js";
import Admin from "../../models/adminSchema.js";
export const CreateCourse = async (req, res) => {
    const { useremail } = req.headers;
    if (!useremail) {
        return res.status(400).json({ message: "Email is required" });
    }
    const adminDocument = await Admin.findOne({ email:useremail });
    if(!adminDocument){
        return res.status(400).json({ message: "User not found" });
    }
    const { name, description, price, expiryDate,publishDate, courseType, imgUrl } = req.body;
    try {
        const course = await Course.create({ name, description, price, expiryDate,publishDate, courseType, imgUrl ,adminEmail: useremail });
        if(course){
            adminDocument.createdCoureses.push({
                courseId: course._id,
                publishDate: course.publishDate,
                totalPurchased: 0,
                totalMoneyEarned: 0,
            });
            await adminDocument.save();
        }
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
}