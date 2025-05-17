import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  avatar: {
    species: String,
    hat: String,
    colors: {
      body: String,
      beak: String
    }
  },
  friends: [String],
  igloo: {
    layout: String,
    energySource: String,
    items: [Object]
  }
});

export default mongoose.model("User", UserSchema);