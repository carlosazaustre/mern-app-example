import mongoose, { Schema, model } from "mongoose";
import { hash, verify } from "./utils";

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  hash(user.password)
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((err) => next(err));
});

UserSchema.methods.comparePassword = function (candidatePassword, next) {
  verify(candidatePassword, this.password, (err, isMatch) => {
    if (err) return next(err);
    next(null, isMatch);
  });
};

export default model("User", UserSchema);
