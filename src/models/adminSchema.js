import mongoose from "mongoose";

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
},{
    timestamps: true,
}
);
export default adminSchema; 