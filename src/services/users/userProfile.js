


import User from "../../models/userSchema.js";

export const UserProfile = async (req, res) => {
    const { useremail } = req.headers;
    if (!useremail) {
        return res.status(400).json({ message: "User Email is required" });
    }
    try {
        const user = await User.findOne({ email: useremail });
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }

        if(user.role !== "USER"){
            return res.status(401).json({ message: "Only for Users" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
}