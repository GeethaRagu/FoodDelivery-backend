import express from "express";
import { signin, signup } from "../Controllers/userController.js";


const userRoute = express.Router();

userRoute.post('/signin',signin);
userRoute.post('/signup',signup);

export default userRoute;
