

import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; 

// Define User Schema
const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: [true, "Firstname is required"],
      minlength: [1, "Name should have at least 1 characters"],
    },
    lastname: {
      type: String,
      minlength: [1, "Name should have at least 1 characters"],
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    minlength: [1, "Email must have at least 1 characters"],
    unique: true, // Ensure unique email
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false, // This will prevent password from being returned in queries
  },
  socketId: {
    type: String,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    return next(error);
  }
});

// Generate JWT Token Method
userSchema.methods.generateAuthToken = function () {
  if (!process.env.TOKEN_SECRET) {
    throw new Error("TOKEN_SECRET is not defined in .env file");
  }

  return jwt.sign(
    { _id: this._id },
    process.env.TOKEN_SECRET, 
    { expiresIn: "48h" }
  );
};

// Check Password Method
userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create User Model
export const userModel = mongoose.model("User", userSchema);
