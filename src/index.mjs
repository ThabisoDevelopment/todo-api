import 'dotenv/config'
import express, { json } from "express"
import mongoose from "mongoose"
import cors from "cors"

/**  Initializing or Starting Express Server */
const app = express()


/**
 *  Make DB connection to Mongo DB
 */
const db = mongoose.connect(process.env.DB_CONNECTION)
db.then(() => console.log("DB connection success!"))

/**
 * CORS middleware
 * Enable body-parser 
 */

const corsOptions = {
    origin: '*',
    methods: "GET, POST, PUT, PATCH, DELETE",
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(json())

/**
 * Import Routes
 * add routes to app
 */
import routes from './router/routes.mjs'
app.use('/api', routes)

/** Server Listening */ 
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log(`Server Running on port: ${PORT}`))
