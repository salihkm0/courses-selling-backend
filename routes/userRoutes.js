import express from "express";
import { getCourses } from "../controllers/courseController.js";
import { signin, signup } from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.get("/get-courses", getCourses);


export default userRouter;