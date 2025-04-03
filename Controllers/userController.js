import userModel from "../Models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

//New user registration

export const signup = async (req, res) => {
  try {
    const { username, email, password, confirmpassword} = req.body;
    //check password
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Password doesn't match" });
    }

    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    //Hashed pwd
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword
      
    });

    //jwt token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
    await newUser.save();
    res
      .status(201)
      .json({ message: "User Created successfully", newUser, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error in signup controller" });
  }
};

// signin

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggeduser = await userModel.find({ email });
    //console.log(loggeduser);
    const isPasswordCorrect = bcryptjs.compare(
      password,
      loggeduser?.password || ""
    );
    if (!loggeduser || !isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    //jwt token
    const token = jwt.sign({ id: loggeduser._id }, process.env.JWT_SECRET_KEY);
    res
      .status(200)
      .json({ message: "User Logged in successfully", loggeduser, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error in signin controller" });
  }
};