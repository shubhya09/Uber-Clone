// import mongoose from "mongoose";

// const blackListSchema=mongoose.Schema(
//     {
//         token:{
//             type:String,
//             unique:true,
//             required:true
//         },
//         createdAt:{
//             type:Date,
//             default:Date.now,
//             expires:86400//24 hours 
//         }
//     }
// )

// export const blackListModel=mongoose.model('BlackListToken',blackListSchema)

import mongoose from "mongoose";

// Define blacklist schema
const blackListSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            unique: true, // Ensure each token is stored only once
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 86400 // Automatically delete after 24 hours (in seconds)
        }
    },
    {
        timestamps: false // No automatic createdAt and updatedAt fields
    }
);

// Create and export the blacklist model
export const blackListModel = mongoose.model('BlackListToken', blackListSchema);
