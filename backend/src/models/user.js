const mongoose = require("mongoose");
const hash = require("../utils/hash");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    require: true,
  },
});

UserSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  },
};

UserSchema.methods.isPasswordCorrect = function (password) {
  return hash.verifyPassword(password, this.password);
};
UserSchema.pre("save", async function (next) {
  try {
    const user = this;
    const hashedPassword = await hash.hashPassword(user.password);
    user.password = hashedPassword;
    next();
  } catch (e) {
    next(e);
  }
});
const UserModel = model("User", UserSchema);

module.exports = UserModel;
