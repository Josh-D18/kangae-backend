import mongoose, { Types } from "mongoose";

const { Schema } = mongoose;

interface IUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  bio: string;
  ideas: [{ ideaID: Types.ObjectId }];
  friends: [{ userID: Types.ObjectId }];
  comments: [{ commentID: Types.ObjectId }];
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, minlength: 3, maxlength: 15 },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bio: { type: String, required: true, minlength: 10, maxlength: 500 },
  ideas: [{ type: Schema.Types.ObjectId, ref: "Idea" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

export const User = mongoose.model("User", userSchema);