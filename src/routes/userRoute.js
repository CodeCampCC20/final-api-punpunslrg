import express from "express"
import { createHealthRecord, deleteRecord, getAllRecords, getNoteFromDoc, getRecordById, updateRecord, userGetMe, userUpdate } from "../controllers/authUserController.js"
import { authUserCheck } from "../middlewares/authUserCheck.js"

const userRoute = express.Router()

userRoute.get('/me', userGetMe)
userRoute.patch('/me', userUpdate)
userRoute.post('/health-records', createHealthRecord)
userRoute.get('/health-records', getAllRecords)
userRoute.get('/health-records/:id', getRecordById)
userRoute.patch('/health-records/:id', updateRecord)
userRoute.delete('/health-records/:id', deleteRecord)
userRoute.get('/doctor-notes/received', getNoteFromDoc)


export default userRoute