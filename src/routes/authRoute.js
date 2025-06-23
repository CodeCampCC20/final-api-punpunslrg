import express from "express"
import { doctorLogin, doctorRegister } from "../controllers/authDoctorController.js"
import { userLogin, userRegister } from "../controllers/authUserController.js"

const authRoute = express.Router()

authRoute.post('/register/doctor', doctorRegister)
authRoute.post('/login/doctor', doctorLogin)
authRoute.post('/register/user', userRegister)
authRoute.post('/login/user', userLogin)

export default authRoute