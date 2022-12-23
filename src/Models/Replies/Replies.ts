import mongoose, { Types } from "mongoose";

const { Schema } = mongoose;

interface IReply {
  user: { username: Types.ObjectId };
  reply: string;
  comment: { comment: Types.ObjectId };
}

const ReplySchema = new Schema<IReply>({
  user: { type: Types.ObjectId, ref: "User" },
  reply: { type: String, required: true },
  comment: { type: Types.ObjectId, ref: "Comment" },
});

export const Reply = mongoose.model("Reply", ReplySchema);
