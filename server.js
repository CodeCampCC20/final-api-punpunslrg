import express from "express"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv";
import notFound from "./src/utils/notFound.js";
import errorHandling from "./src/utils/errorHandling.js";
import authRoute from "./src/routes/authRoute.js";
import userRoute from "./src/routes/userRoute.js";
import doctorRoute from "./src/routes/doctorRoute.js";
import { authUserCheck } from "./src/middlewares/authUserCheck.js";
import { authDocCheck } from "./src/middlewares/authDocCheck.js";

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/auth', authRoute)
app.use('/users', authUserCheck, userRoute)
app.use('/doctors', authDocCheck, doctorRoute)

app.use(notFound)

app.use(errorHandling)

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`)
})