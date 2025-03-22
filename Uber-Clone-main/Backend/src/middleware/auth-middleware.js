// import { blackListModel } from "../models/blacklistToken-model.js";
// import { CaptainModel } from "../models/captain-model.js";
// import { userModel } from "../models/user-model.js";
// import jwt from "jsonwebtoken";

// export const authmiddlewareUser=async (req,res,next) => {
//     try {
//         const token= req.headers.authorization?.split(' ')[1] || req.cookies.token 
//          if(!token){
//             return res.status(400).json({
//                 message:"Token not found Unauthorized"
//             })
//         }
//         const isTokenBlacklisted=await blackListModel.findOne({token})

//         if(isTokenBlacklisted){
//             res.status(404).
//             json({
//                 message:"Token not valid"
//             })
//         }
//         const verifyToken=jwt.verify(token,process.env.TOKEN_SECRET)
//         const user=await userModel.findById(verifyToken._id).select('-__v')
//         if(!user){
//             return res.status(400).json({
//                 message:"User not found"
//             })
//         }
//         req.user=user
//         next()
//     } catch (error) {
//         console.log(error);
//         return res.status(400).
//         json({
//             message:"Unauthorized"
//         })
//     }
// }


// export const authmiddlewareCap=async (req,res,next) => {
//     try {
//         const token=req.headers.authorization.split(' ')[1] || req.cookies.token 
    
//         if(!token){
//             return res.status(400)
//             .json({
//                 message:"Token not found"
//             })
//         }
    
//         const isTokenBlacklisted=await blackListModel.findOne({token})
    
      
//         if(isTokenBlacklisted){
//             res.status(404).
//             json({
//                 message:"Token not invalid"
//             })
//         }
    
//         const verifyToken=jwt.verify(token,process.env.TOKEN_SECRET)
//         if(!verifyToken){
//             res.status(404).
//             json({
//                 message:"Unauthorized user"
//             })
//         }
    
//         const captain=await CaptainModel.findById(verifyToken._id).select('-__v')
//         req.captain=captain
//         next()
//     } catch (error) {
//         res.status(400)
//         .json({
//             message:"Unauthorized user"
//         })
//     }
// }

// import { blackListModel } from "../models/blacklistToken-model.js";
// import { CaptainModel } from "../models/captain-model.js";
// import { userModel } from "../models/user-model.js";
// import jwt from "jsonwebtoken";

// // User Authentication Middleware
// export const authmiddlewareUser = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;

//         if (!token) {
//             return res.status(401).json({ message: "Token not found. Unauthorized" });
//         }

//         // Check if token is blacklisted
//         const isTokenBlacklisted = await blackListModel.findOne({ token });
//         if (isTokenBlacklisted) {
//             return res.status(401).json({ message: "Token is invalid or blacklisted" });
//         }

//         // Verify token
//         const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET);

//         // Check if user exists
//         const user = await userModel.findById(verifyToken._id).select('-__v');
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         console.error("Error in authmiddlewareUser:", error);
//         return res.status(401).json({ message: "Unauthorized or invalid token" });
//     }
// };

// // Captain Authentication Middleware
// export const authmiddlewareCap = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;

//         if (!token) {
//             return res.status(401).json({ message: "Token not found. Unauthorized" });
//         }

//         // Check if token is blacklisted
//         const isTokenBlacklisted = await blackListModel.findOne({ token });
//         if (isTokenBlacklisted) {
//             return res.status(401).json({ message: "Token is invalid or blacklisted" });
//         }

//         // Verify token
//         const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET);

//         // Check if captain exists
//         const captain = await CaptainModel.findById(verifyToken._id).select('-__v');
//         if (!captain) {
//             return res.status(404).json({ message: "Captain not found" });
//         }

//         req.captain = captain;
//         next();
//     } catch (error) {
//         console.error("Error in authmiddlewareCap:", error);
//         return res.status(401).json({ message: "Unauthorized or invalid token" });
//     }
// };




import { blackListModel } from "../models/blacklistToken-model.js";
import { CaptainModel } from "../models/captain-model.js";
import { userModel } from "../models/user-model.js";
import jwt from "jsonwebtoken";

// ✅ Function to Validate Token and Handle Errors
const validateToken = async (token, secret) => {
    try {
        // Ensure token is provided
        if (!token) throw new Error("Token not provided");

        // Check if token is blacklisted
        const isTokenBlacklisted = await blackListModel.findOne({ token });
        if (isTokenBlacklisted) throw new Error("Token is invalid or blacklisted");

        // Verify the token
        return jwt.verify(token, secret);
    } catch (error) {
        throw new Error(error.message || "Invalid or expired token");
    }
};

// ✅ User Authentication Middleware
export const authmiddlewareUser = async (req, res, next) => {
    try {
        // Get token from Authorization header or cookies
        const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;

        // Validate token
        const decoded = await validateToken(token, process.env.TOKEN_SECRET);

        // Find user and attach to request object
        const user = await userModel.findById(decoded._id).select('-__v');
        if (!user) return res.status(404).json({ message: "User not found" });

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in authmiddlewareUser:", error.message);
        return res.status(401).json({ message: error.message });
    }
};

// ✅ Captain Authentication Middleware
export const authmiddlewareCap = async (req, res, next) => {
    try {
        // Get token from Authorization header or cookies
        const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;

        // Validate token
        const decoded = await validateToken(token, process.env.TOKEN_SECRET);

        // Find captain and attach to request object
        const captain = await CaptainModel.findById(decoded._id).select('-__v');
        if (!captain) return res.status(404).json({ message: "Captain not found" });

        req.captain = captain;
        next();
    } catch (error) {
        console.error("Error in authmiddlewareCap:", error.message);
        return res.status(401).json({ message: error.message });
    }
};
