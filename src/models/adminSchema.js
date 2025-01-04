import mongoose from "mongoose";



const purchaserDetailSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    purchaseDate: {
        type: Number,
        required: true,
    },
    courseId: {
        type:String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    
});


const MyCreatedCourses = new mongoose.Schema({
    courseId: {
        type: String,
        required: true,
    },
    publishDate: {
        type: Number,
        required: true,
    },
    totalPurchased:{
        type: Number,
        required: true,
    },
    totalMoneyEarned:{
        type: Number,
        required: true,
    },
    purchaserDetails :{
        type: [purchaserDetailSchema],
        default: [],
    },
});


const adminSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdCoureses:{
        type: [MyCreatedCourses],
        default: [],
    }
},{
    timestamps: true,
}
);


const Admin = mongoose.model("Admin", adminSchema);
export default Admin;