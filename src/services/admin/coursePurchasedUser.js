
import Admin from "../../models/adminSchema.js";
import Course from "../../models/courseSchema.js";
export const CoursePruchasedUsers = async (req, res) => {
    const courseId = req.params.id;
    if (!courseId) return res.status(400).json({ message: "Course ID is required" });
    const courseDocument = await Course.findById(courseId);
    if (!courseDocument) return res.status(400).json({ message: "Course not found" })
    try {
        console.log(courseDocument);
        const courses = await Admin.findOne({ email: courseDocument.adminEmail });
        if (!courses) return res.status(400).json({ message: "Admin not found" });
        const courseInAdmin = courses.createdCoureses.find(c => c.courseId === courseId);
        if (!courseInAdmin)return res.status(400).json({ message: "Course not found in admin's created courses" });
        
        const purchasedUsers = courseInAdmin.purchaserDetails.map(p => ({
            userEmail: p.userEmail,
            purchaseDate: p.purchaseDate,
            courseId: p.courseId,
            price: p.price,
        }));
        res.status(200).json({
            msg:courseDocument.name,
            allPurchasedUsers: purchasedUsers,
        });
    
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

};