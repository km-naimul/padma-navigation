import mongoose, { Schema, Document } from 'mongoose';

export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface IGhat extends Document {
  name: string;
  location: string;
  address?: string;
  coordinates?: ICoordinates;
  facilities: string[];
  contactNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CoordinatesSchema: Schema = new Schema(
  {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const GhatSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Ghat name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    address: {
      type: String,
    },
    coordinates: {
      type: CoordinatesSchema,
    },
    facilities: {
      type: [String],
      default: [],
    },
    contactNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
GhatSchema.index({ name: 1 });
GhatSchema.index({ location: 1 });

export default mongoose.model<IGhat>('Ghat', GhatSchema);
