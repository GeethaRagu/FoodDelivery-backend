// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   const token = req.headers.token;
//   console.log(token);
//   if (!token) {
//     return res.json({ success: false, message: "Not Authorized.Login Again" });
//   }

//   try {
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     console.log(token_decode.id);
//     req.body.userId = token_decode.id;
//     //console.log(req.body.userId);
//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

import jwt from 'jsonwebtoken';
import { errorHandler } from '../Utils/Error.js';
export const verifyToken = (req, res, next) => {
  const token = req.headers.token;
 // console.log(token);
  if (!token) {
    return next(errorHandler(401, 'Not Authorized.Login Again'));
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Unauthorized access' ));
    }
   
    req.user = user;
    //console.log(user);
    next();
  });
};