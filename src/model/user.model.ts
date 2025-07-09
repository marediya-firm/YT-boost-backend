import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    idToken: { type: String, required: true },
    user: {
      id: { type: String, required: true },
      googleToken: { type: String, required: true },
      email: { type: String, required: true },
      familyName: String,
      givenName: String,
      name: String,
      photo: String,
    },
  },
  {
    autoIndex: false,
    timestamps: true, // adds createdAt and updatedAt
  }
);

userSchema.index({ "user.email": 1 }, { unique: true });
export const UserModel = mongoose.model("users", userSchema);
