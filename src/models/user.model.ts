import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import uniqueValidator from "mongoose-unique-validator";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "customer" | "vendor";
}
const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "customer",
  },
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  return next();
});

const UserModel = model<IUser>("user", UserSchema);

export default UserModel;
