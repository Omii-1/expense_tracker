import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { configDotenv } from "dotenv"

import connectToMongoose from "./config/conn.js"

configDotenv({
  path: "./.env"
})

const app = express()
const port = process.env.PORT || 3001

app.use(cors({
  origin: function(origin, callback) {
    if(!origin || this.allowedOrigins.includes(origin)){
      this.callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json)
app.use(cookieParser())

app.listen(port, () => {
  connectToMongoose()
  console.log(`Server running on port ${port}`);
})