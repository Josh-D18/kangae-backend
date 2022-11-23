import mongoose, { Types } from "mongoose";

const { Schema } = mongoose;

interface IReply {
  username: { username: Types.ObjectId };
  firstName: { firstName: Types.ObjectId };
  lastName: { lastName: Types.ObjectId };
  comment: string;
  userID: { userID: Types.ObjectId };
  ownerOfOriginalComment: { ownerOfOriginalComment: Types.ObjectId };
  commentID: { commentID: Types.ObjectId };
}

const ReplySchema = new Schema<IReply>({
  username: { type: Types.ObjectId, ref: "User" },
  firstName: { type: Types.ObjectId, ref: "User" },
  lastName: { type: Types.ObjectId, ref: "User" },
  comment: { type: String, required: true },
  userID: { type: Types.ObjectId, ref: "User" },
  ownerOfOriginalComment: { type: Types.ObjectId, ref: "User" },
  commentID: { type: Types.ObjectId, ref: "Comment" },
});

export const Reply = mongoose.model("Reply", ReplySchema);
