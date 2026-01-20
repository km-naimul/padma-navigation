import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  title: string;
  description: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  instructions?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    contactInfo: {
      phone: { type: String, trim: true },
      email: { type: String, trim: true },
      address: { type: String, trim: true },
    },
    instructions: [{
      type: String,
      trim: true,
    }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBooking>('Booking', BookingSchema);
