import mongoose, { Types } from "mongoose";

const { Schema } = mongoose;

interface IComment {
  username: { username: Types.ObjectId };
  firstName: { firstName: Types.ObjectId };
  lastName: { lastName: Types.ObjectId };
  ideaID: { ideaID: Types.ObjectId };
  comment: string;
  userID: { userID: Types.ObjectId };
  replies: [{ replyID: Types.ObjectId }];
}

const commentsSchema = new Schema<IComment>({
  username: { type: Types.ObjectId, ref: "User" },
  firstName: { type: Types.ObjectId, ref: "User" },
  lastName: { type: Types.ObjectId, ref: "User" },
  ideaID: { type: Types.ObjectId, ref: "Idea" },
  userID: { type: Types.ObjectId, ref: "User" },
  comment: { type: String, required: true },
  replies: [{ type: Types.ObjectId, ref: "Reply" }],
});

export const Comment = mongoose.model("Comment", commentsSchema);
