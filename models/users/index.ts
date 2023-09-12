import { compare, hash } from "bcrypt";
import { Schema, Model, model } from "mongoose";
import { SALT_ROUNDS } from "../../config";
import type { UserDocument } from "./types";

export interface User extends UserDocument {
  validatePassword(password: string): boolean;
  apiRepr(): UserDocument;
}

export interface UserModel extends Model<User> {
  hashPassword(password: string): string;
}

export const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  streams: { type: [String], required: false },
});

// arrow functions not possible here, since they close over lexically enclosing context (i.e: this remains this)

UserSchema.method("apiRepr", function () {
  return {
    id: this._id.toString(),
    username: this.username || "",
    email: this.email || "",
    streams: this.streams || [],
  };
});

UserSchema.method(
  "validatePassword",
  function (password: string): Promise<boolean> {
    return compare(password, this.password);
  }
);

UserSchema.static(
  "hashPassword",
  (password: string): Promise<string> => hash(password, SALT_ROUNDS)
);

export const User: UserModel = model<User, UserModel>("User", UserSchema);

export default User;
