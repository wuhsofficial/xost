import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICareer extends Document {
  title: string;
  type: string;
  department: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
}

const CareerSchema = new Schema<ICareer>({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  type: {
    type: String,
    enum: ["Remote", "Hybrid", "On-site"],
    default: "Remote",
    trim: true,
  },
  department: {
    type: String,
    required: [true, "Department is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Career: Model<ICareer> =
  mongoose.models.Career || mongoose.model<ICareer>("Career", CareerSchema);

export default Career;
