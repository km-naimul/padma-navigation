import mongoose, { Schema, Document } from 'mongoose';

export interface ISchedule {
  launchId: mongoose.Types.ObjectId;
  departureTime: string;
  arrivalTime?: string;
  daysOfWeek: string[];
  ghatIds: mongoose.Types.ObjectId[];
}

export interface IRoute extends Document {
  name: string;
  launchIds: mongoose.Types.ObjectId[];
  schedules: ISchedule[];
  distance?: string;
  estimatedDuration?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ScheduleSchema: Schema = new Schema(
  {
    launchId: {
      type: Schema.Types.ObjectId,
      ref: 'Launch',
      required: true,
    },
    departureTime: {
      type: String,
      required: [true, 'Departure time is required'],
    },
    arrivalTime: {
      type: String,
    },
    daysOfWeek: {
      type: [String],
      required: true,
      validate: {
        validator: (days: string[]) => days.length > 0,
        message: 'At least one day of week is required',
      },
    },
    ghatIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Ghat',
      },
    ],
  },
  { _id: false }
);

const RouteSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Route name is required'],
      trim: true,
    },
    launchIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Launch',
      },
    ],
    schedules: {
      type: [ScheduleSchema],
      default: [],
    },
    distance: {
      type: String,
    },
    estimatedDuration: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
RouteSchema.index({ name: 1 });
RouteSchema.index({ launchIds: 1 });

export default mongoose.model<IRoute>('Route', RouteSchema);
