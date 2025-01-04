
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
        if(!course || !course.isActive){
            return res.status(400).json({ message: "Course Does not exist" });
        }
        const userDocument = await User.findOne({ email: useremail });
        if(!userDocument) return res.status(400).json({ message: "User not found" });
        const purchase = await Purchase.create({ userEmail: useremail, courseId, purchaseDate : new Date() });
       

        await userDocument.updateOne({ $push: { myCourses: { courseId, purchaseDate: new Date() } } });
        const adminDocument = await Admin.findOne({ email: course.adminEmail}); 
        if (!adminDocument) {
            return res.status(400).json({ message: "Admin documnet not found" });
        }

        const courseInAdmin = adminDocument.createdCoureses.find(c => c.courseId === courseId);  // Make sure createdCoureses is correct
        if (!courseInAdmin) {
            return res.status(400).json({ message: "Course not found in admin's created courses" });
        }

        courseInAdmin.totalPurchased += 1;
        courseInAdmin.totalMoneyEarned += course.price;
        courseInAdmin.purchaserDetails.push({
            userEmail: useremail,
            purchaseDate: Date.now(),  
            courseId: courseId,  
            price: course.price,
        });
        

        await adminDocument.save();

        
        res.status(201).json({
            msg: "Course Purchased",
            purchase,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
}