import mongoose from "mongoose";
const purchaseSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    courseId: {
        type:String,
        required: true,
    },
    purchaseDate: {
        type: Number,
        required: true,
    },
},{timestamps: true}
);


const Purchase = mongoose.model("Purchase", purchaseSchema);
export default Purchase;