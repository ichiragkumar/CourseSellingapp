import express from "express";
import {CreateCourse} from "../services/admin/createCourse.js";
import {DeleteCourse} from "../services/admin/deleteCourse.js";
import {authMiddleware} from "../middlewares/admin.js";
import {AdminAllCourses} from "../services/admin/adminAllCourses.js";
import {AdminProfile} from "../services/admin/adminProfile.js";
import {AdminSignup} from "../services/admin/adminSignUp.js";
import {AdminLogin} from "../services/admin/adminLogin.js";
const Adminrouter = express.Router();

Adminrouter.post("/signup", AdminSignup);
Adminrouter.post("/login", AdminLogin);
Adminrouter.post("/create",authMiddleware, CreateCourse);
Adminrouter.patch("/delete/:id", authMiddleware, DeleteCourse);
Adminrouter.get("/admin-profile", authMiddleware, AdminProfile);
// Adminrouter.patch("/update-course:id", AdminUpdateCourse);
Adminrouter.get("/courses",authMiddleware, AdminAllCourses);
// Adminrouter.get("/purchased-users", AdminCoursePurchasedUsers);

export default Adminrouter;