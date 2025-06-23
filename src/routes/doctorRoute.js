import express from "express"
import { createNote, deleteNote, doctorGetMe, doctorUpdate, getAllRecords, getRecordByUserId, updateNote } from "../controllers/authDoctorController.js"
import { authDocCheck } from "../middlewares/authDocCheck.js"

const doctorRoute = express.Router()

doctorRoute.get('/me', authDocCheck, doctorGetMe)
doctorRoute.patch('/me', authDocCheck, doctorUpdate)
doctorRoute.post('/doctor-notes', authDocCheck, createNote)
doctorRoute.get('/doctor-notes/my-notes', authDocCheck, getAllRecords)
doctorRoute.get('/doctor-notes/user/:userId', authDocCheck, getRecordByUserId)
doctorRoute.patch('/doctor-notes/:id', authDocCheck, updateNote)
doctorRoute.delete('/doctor-notes/:id', authDocCheck, deleteNote)

export default doctorRoute