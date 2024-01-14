import mongoose from "mongoose";
import { psychData } from "./psychiatristData.js";
import { hsptData } from "./hospitalData.js";
import { Psychiatrist } from "../src/models/psychiatrist.model.js";
import { Hospital } from "../src/models/hospital.model.js";


main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("error while conecting db !! ", err);
  });

async function main() {
  await mongoose.connect(uprocess.env.MONGODB_URI);
}

// const initDB = async () => {
//   await Psychiatrist.insertMany(psychData);
//   console.log("successfull");
// };

const initDB = async () => {
  await Hospital.insertMany(hsptData);
  console.log("successfull");
};

initDB();
