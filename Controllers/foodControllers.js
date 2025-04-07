import foodModel from "../Models/foodModel.js";
import fs from "fs";

export const addFood = async (req, res) => {
  try {
    let image_filename = `${req.file.filename}`;
    //let image_filename = `${req.body.image}`;
    const food = foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });
    await food.save();
    res
      .status(200)
      .json({ success: true, message: "Food added successfully", food });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error in addFood" });
  }
};

export const foodList = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200).json({
      success: true,
      message: "Food listed successfully",
      data: foods,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error in listfood" });
  }
};

export const foodRemove = async (req, res) => {
  try {
    const foodId = req.body.id;
    //console.log(foodId);
    const food = await foodModel.find({ _id: foodId });
    // console.log(food);
    // console.log(food[0].name);
    // console.log('Current working directory:', process.cwd());
    const workingdirectory = process.cwd();
    const filePath = `${workingdirectory}/uploads/${food[0].image}`;

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
        return;
      }
      //console.log(`File ${filePath} deleted successfully`);
    });
    //await fs.unlink(`/uploads/${food.image}`, () => {});
    await foodModel.deleteOne({ _id: foodId });
    res
      .status(200)
      .json({ success: true, message: "Food deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error in removefood" });
  }
};


export const searchFood = async(req,res)=>{
  try {
    const { query } = req.query; // Search query from frontend
    if (!query) return res.status(400).json({ message: 'Query parameter is required' });

    // Simple search using regex
    const items = await foodModel.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // case-insensitive search
        { description: { $regex: query, $options: 'i' } }
      ]
    });

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error searching items', error: err });
  }
}
