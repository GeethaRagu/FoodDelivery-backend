import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Database/Config.js";
import foodRouter from "./Routes/foodRoute.js";

const app = express();

dotenv.config();

app.use(express.json());

app.use(
  cors({
    origin: process.env.BASE,
    credentials: true,
  })
);

connectDB();

// custom routes
app.use('/api/food',foodRouter);
app.use('/images',express.static("uploads"));

//default route
app.get("/", (req, res) => {
  res.send("Welcome to Food delivery application");
});

//Listening to port
app.listen(process.env.PORT, () => {
  console.log("Server is running successfully");
});
