import mongoose from "mongoose";

const MyCourses = new mongoose.Schema({
    courseId: {
        type: String,
        required: true,
    },
    purchaseDate: {
        type: Number,
        required: true,
    },
});
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "User",
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        default: "USER",
        enum: ["ADMIN", "USER"],
    },
    myCourses: {
        type: [MyCourses],
        default: [],
    },
},{
    timestamps: true,
}
);


const User = mongoose.model("User", userSchema);
export default User;