import mongoose, { Schema, Document } from 'mongoose';

export interface ILaunch extends Document {
  name: string;
  routeIds: mongoose.Types.ObjectId[];
  capacity: number;
  facilities: string[];
  contactNumber: string;
  alternateContact?: string;
  status: 'active' | 'inactive';
  imageUrl?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LaunchSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Launch name is required'],
      trim: true,
    },
    routeIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Route',
      },
    ],
    capacity: {
      type: Number,
      required: [true, 'Capacity is required'],
      min: [1, 'Capacity must be at least 1'],
    },
    facilities: {
      type: [String],
      default: [],
    },
    contactNumber: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    alternateContact: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    imageUrl: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
LaunchSchema.index({ name: 1 });
LaunchSchema.index({ status: 1 });
LaunchSchema.index({ routeIds: 1 });

export default mongoose.model<ILaunch>('Launch', LaunchSchema);
