import Admin from "../../models/adminSchema.js";


export const AdminProfile = async (req, res) => {
    const { useremail } = req.headers;
    if (!useremail) {
        return res.status(400).json({ message: "Email is required" });
    }
    try {
        const adminDocument = await Admin.findOne({ email:useremail });
        console.log("found", adminDocument);
        if(!adminDocument){
            return res.status(400).json({ message: "Admin not found" });
        }
        res.status(200).json({
            adminDocument,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
}