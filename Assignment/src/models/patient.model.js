import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"


const patientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
    },
    photo: {
      type: String,
      required: true,
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
    },
  },
  {
    timestamps: true,
  }
);

patientSchema.pre("save",async function(next){
    if(!this.isModified("password"))
    return next();

    this.password = await bcrypt.hash(this.password,8);
    next();
})


export const Patient = mongoose.model("Patient", patientSchema);
