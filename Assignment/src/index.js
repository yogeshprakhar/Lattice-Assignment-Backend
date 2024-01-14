import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js"

dotenv.config({
    path:"./.env"
})

connectDB()
  .then(() => {
    // for error
    app.on("error", (error) => {
      console.log("Error", error);
      throw error;
    });
    // for server listen on PORT
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at PORT : ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection Failed!!", err);
  });