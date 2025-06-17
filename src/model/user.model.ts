import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    idToken: { type: String, required: true },
    user: {
      id: { type: String, required: true },
      email: { type: String, required: true },
      familyName: String,
      givenName: String,
      name: String,
      photo: String,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

export const UserModel = mongoose.model("users", userSchema);
