import mongoose, { Types } from "mongoose";

const { Schema } = mongoose;

interface IIdea {
  username: { username: Types.ObjectId };
  idea: string;
  category: string;
  description: string;
  likes: number;
  comments: [{ commentID: Types.ObjectId }];
}

const ideaSchema = new Schema<IIdea>({
  username: { type: Types.ObjectId, ref: "User" },
  idea: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likes: { type: Number },
});

export const Idea = mongoose.model("Idea", ideaSchema);
