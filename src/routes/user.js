import express from "express";

import {UserSignup} from "../services/users/userSignUp.js";
import {UserLogin} from "../services/users/userLogin.js";
import {AllCourses} from "../services/users/courses.js";
import {UserPurchase} from "../services/users/coursePurchase.js";
import {MyCourses} from "../services/users/mycourses.js";
import {UserProfile} from "../services/users/userProfile.js";
import { authUserMiddleware } from "../middlewares/user.js";
const router = express.Router();

router.post("/signup", UserSignup);
router.post("/login", UserLogin);
router.get("/user",authUserMiddleware,  UserProfile);
router.post("/purchase", UserPurchase);
router.get("/courses", AllCourses);
router.get("/my-courses", MyCourses);
export default router;