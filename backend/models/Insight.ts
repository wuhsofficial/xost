import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInsight extends Document {
  title: string;
  category: string;
  excerpt?: string;
  content?: string;
  author?: string;
  readTime?: string;
  imageGradient?: string;
  createdAt: Date;
}

const InsightSchema = new Schema<IInsight>({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true,
  },
  excerpt: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    trim: true,
  },
  author: {
    type: String,
    trim: true,
  },
  readTime: {
    type: String,
    trim: true,
  },
  imageGradient: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Insight: Model<IInsight> =
  mongoose.models.Insight || mongoose.model<IInsight>("Insight", InsightSchema);

export default Insight;
