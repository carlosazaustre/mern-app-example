import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true },
  passwordHashed: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject._v;
    delete returnedObject.passwordHashed;
  },
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("passwordHashed")) return next();

  hash(user.password)
    .then((passwordHashed) => {
      user.passwordHashed = passwordHashed;
      next();
    })
    .catch((err) => next(err));
});

UserSchema.methods.comparePassword = function (candidatePassword, next) {
  const user = this;
  verify(candidatePassword, user.passwordHashed, (err, isMatch) => {
    if (err) return next(err);
    next(null, isMatch);
  });
};

export default model("User", UserSchema);
