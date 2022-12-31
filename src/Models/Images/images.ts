import mongoose, { Types } from "mongoose";

const { Schema } = mongoose;

interface IImage {
  path: string;
  data: Buffer;
}

const imageSchema = new Schema<IImage>({
  path: { type: String },
  data: { type: Buffer },
});

export const User = mongoose.model("Image", imageSchema);
