import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required "],
    },
  },
  { timestamps: true }
);

export const User = new mongoose.model("User", userSchema);
