import userModel from "../Models/userModel.js";

export const addToCart = async (req, res) => {
  try {
    //console.log(req.user.id);
    let userData = await userModel.findOne({ _id: req.user.id });
    // console.log(userData);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.user.id, { cartData });
    res.status(200).json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error in Add to cart" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    //console.log(req.user.id);
    let userData = await userModel.findOne({ _id: req.user.id });
    // console.log(userData);
    let cartData = await userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    } 

    await userModel.findByIdAndUpdate(req.user.id, { cartData });
    res.status(200).json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error in Removed From cart" });
  }
};

export const getCart = async(req, res) => {
    try {
        //console.log(req.user.id);
        let userData = await userModel.findOne({ _id: req.user.id });
        // console.log(userData);
        let cartData = await userData.cartData;
    

        res.status(200).json({ success: true, message: "Items in Cart" ,cartData});
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ error: "Internal server error in get cart" });
      }
};
