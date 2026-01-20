import mongoose, { Schema, Document } from 'mongoose';

export interface IPolicy extends Document {
  title: string;
  content: string;
  category: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PolicySchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    category: {
      type: String,
      trim: true,
      default: 'General',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPolicy>('Policy', PolicySchema);
