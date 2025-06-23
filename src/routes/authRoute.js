import express from "express"
import { doctorLogin, doctorRegister } from "../controllers/authDoctorController.js"
import { userLogin, userRegister } from "../controllers/authUserController.js"
import validatorMiddleware from "../validators/validate.js"
import { schemaDoctorRegister, schemaUserRegister } from "../utils/schema-auth.js"

const authRoute = express.Router()

authRoute.post('/register/doctor', validatorMiddleware(schemaDoctorRegister) , doctorRegister)
authRoute.post('/login/doctor', doctorLogin)
authRoute.post('/register/user', validatorMiddleware(schemaUserRegister), userRegister)
authRoute.post('/login/user', userLogin)

export default authRoute