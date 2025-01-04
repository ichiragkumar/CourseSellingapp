import mongoose from "mongoose";
import { COURSE_TYPES } from "../config/index.js";


const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    expiryDate: {
        type: Number,
        required: true,
    },
    publishDate: {
        type: Number,
        required: true,
    },
    courseType: {
        type: String,
        enum:COURSE_TYPES,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    adminEmail:{
        type:String,
        required:true
    },


});

const Course = mongoose.model("Course", courseSchema);
export default Course;