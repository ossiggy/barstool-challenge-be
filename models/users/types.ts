import { Document, Types } from "mongoose";

export interface UserDocument extends Document {
  _id?: Types.ObjectId;
  id?: string;
  username: string;
  password: string;
  email: string;
  streams?: string[];
}

export type UserToUpdate = {
  streams?: string[];
};
