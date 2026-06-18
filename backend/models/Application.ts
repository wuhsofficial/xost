import mongoose, { Schema, Document, Model } from "mongoose";

export interface IApplication extends Document {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  portfolioUrl?: string;
  coverLetter: string;
  createdAt: Date;
}

const ApplicationSchema = new Schema<IApplication>({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
  },
  position: {
    type: String,
    required: [true, "Position is required"],
    trim: true,
  },
  portfolioUrl: {
    type: String,
    trim: true,
  },
  coverLetter: {
    type: String,
    required: [true, "Cover letter is required"],
    minlength: [300, "Cover letter must be at least 300 characters"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Application: Model<IApplication> =
  mongoose.models.Application || mongoose.model<IApplication>("Application", ApplicationSchema);

export default Application;
