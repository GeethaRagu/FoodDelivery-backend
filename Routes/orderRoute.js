import express from "express";

import { verifyToken } from "../Middleware/verifyToken.js";
import { listorders, placeOrder, updateStatus, userOrders, verifyOrder } from "../Controllers/orderController.js";

const orderRoute = express.Router();

orderRoute.post('/place',verifyToken,placeOrder);
orderRoute.post('/verify',verifyOrder);
orderRoute.post('/userorders',verifyToken,userOrders);
orderRoute.get('/list',listorders);
orderRoute.post('/status',updateStatus);

export default orderRoute;