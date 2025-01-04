import express from "express";
import {CreateCourse} from "../services/admin/createCourse.js";
import {DeleteCourse} from "../services/admin/deleteCourse.js";
import {authMiddleware} from "../middlewares/admin.js";
import {AdminAllCourses} from "../services/admin/adminAllCourses.js";
const Adminrouter = express.Router();


Adminrouter.post("/create",authMiddleware, CreateCourse);
Adminrouter.patch("/delete/:id", authMiddleware, DeleteCourse);
// Adminrouter.patch("/update-course:id", AdminUpdateCourse);
Adminrouter.get("/courses",authMiddleware, AdminAllCourses);
// Adminrouter.get("/purchased-users", AdminCoursePurchasedUsers);

export default Adminrouter;