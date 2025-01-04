
import Course from "../../models/courseSchema.js";
import User from "../../models/userSchema.js";
import Purchase from "../../models/purchaseSchema.js";
import Admin from "../../models/adminSchema.js";
export const UserPurchase = async (req, res) => {
    const { courseId } = req.query;
    const { useremail } = req.headers;

    if (!courseId || !useremail) {
        return res.status(400).json({ message: "Course ID and User Email is required" });
    }


    try {
        const course = await Course.findById(courseId);
        if(course.isActive === false){
            return res.status(400).json({ message: "Course is not active" });
        }

        const userDocument = await User.findOne({ email: useremail });
        if(!userDocument){
            return res.status(400).json({ message: "User not found" });
        }

        const purchase = await Purchase.create({ userEmail: useremail, courseId, purchaseDate : new Date() });
        res.status(201).json({
            msg: "Course Purchased",
            purchase,
        });
        await userDocument.updateOne({ $push: { myCourses: { courseId, purchaseDate: new Date() } } });
        await Admin.findOneAndUpdate({ email: course.adminEmail }, { $push: { createdCoureses: { courseId, publishDate: new Date(), totalPurchased: 1, totalMoneyEarned: course.price } } });   
        

    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
}