import Admin from "../../models/adminSchema.js";


export const AdminAllUsers = async (req, res) => {
    const { useremail } = req.headers;
    if (!useremail) return res.status(400).json({ message: "Email is required" });
    try {
        const adminDocument = await Admin.findOne({ email: useremail });
        if (!adminDocument) return res.status(400).json({ message: "Admin not found" });
        const allPurchasedUsers = [];

        adminDocument.createdCoureses.forEach((course) => {
            const purchaserDetails = course.purchaserDetails.map(({ userEmail, price }) => ({
                userEmail,
                price,
            }));
            allPurchasedUsers.push(...purchaserDetails);
        });


        res.status(200).json({
            msg: "All Users",
            allPurchasedUsers,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
}   