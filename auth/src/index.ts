import express from "express";
import 'express-async-errors'
import mongoose from "mongoose";

import {json} from 'body-parser'
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/eror-handler";
import { NotFoundError } from "./errors/not-found-error";
import cookieSession from "cookie-session";

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(cookieSession({
    signed: false,
    secure: true
}))

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', async () => {
    throw new NotFoundError
})

app.use(errorHandler)

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined!")
    }

    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        console.log('db connected .......')
    } catch (error) {
        console.error(error)
    }
    app.listen(3000, () => {
        console.log('Listening on port 3000')
    })
}

start()