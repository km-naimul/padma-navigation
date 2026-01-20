import mongoose, { Schema, Document } from 'mongoose';

export interface IManagement extends Document {
  name: string;
  position: string;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ManagementSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
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

export default mongoose.model<IManagement>('Management', ManagementSchema);
