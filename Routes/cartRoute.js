import express from "express";
import { addToCart, getCart, removeFromCart } from "../Controllers/cartControllers.js";
import { verifyToken } from "../Middleware/verifyToken.js";

const cartRoute = express.Router();

cartRoute.post('/add',verifyToken,addToCart);
cartRoute.post('/remove',verifyToken,removeFromCart);
cartRoute.post('/get',verifyToken,getCart);

export default cartRoute;