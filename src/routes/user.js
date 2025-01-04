import express from "express";

import {Signup} from "../services/signUp.js";
import {Login} from "../services/login.js";
import {AllCourses} from "../services/users/courses.js";
const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
// router.post("/purchase", UserPurchase);
router.get("/courses", AllCourses);
// router.get("/purchased", PurchasedCourses);
export default router;