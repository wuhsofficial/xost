import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: [true, "Name is required"],
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
    trim: true,
  },
  subject: {
    type: String,
    required: [true, "Subject is required"],
    trim: true,
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;
