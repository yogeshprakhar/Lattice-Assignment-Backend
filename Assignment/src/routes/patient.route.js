import {Router} from "express"
import { registerPatient,psychiatristDetail } from "../controllers/patient.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name:"photo",
            maxCount:1,
        }
    ]),
    registerPatient
)

router.route("/id").get(
    psychiatristDetail
)

export default router;