import mongoose, { Types } from "mongoose";

const { Schema } = mongoose;

interface IIdea {
  username: { username: Types.ObjectId };
  idea: string;
  category: string;
  description: string;
  likes: number;
}

const ideaSchema = new Schema<IIdea>({
  username: { type: Types.ObjectId, ref: "User" },
  idea: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  likes: { type: Number },
});

export const Idea = mongoose.model("Idea", ideaSchema);
