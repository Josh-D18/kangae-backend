import mongoose, { Types } from "mongoose";

const { Schema } = mongoose;

interface IComment {
  username: { username: Types.ObjectId };
  comment: string;
  replies: [{ replyID: Types.ObjectId }];
}

const commentsSchema = new Schema<IComment>({
  username: { type: Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
  replies: [{ type: Types.ObjectId, ref: "Reply" }],
});

export const Comment = mongoose.model("Comment", commentsSchema);
