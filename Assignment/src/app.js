import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

// ROUTES
import patientRouter from "./routes/patient.route.js"
// import { psychiatristDetail } from "./controllers/patient.controller.js"

app.use("/patient",patientRouter)

// app.use("/hospital",patientRouter)

export {app}