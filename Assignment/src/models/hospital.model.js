import mongoose, { Schema } from "mongoose";

const hospitalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    hsptId: {
      type: String,
      required: true,
      unique: true,
    },
    patient: [
      {
        type: Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
    psychiatrist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Psychiatrist",
      },
    ],
  },
  {
    timestamps: true,
  }
);





export const Hospital = mongoose.model("Hospital", hospitalSchema);