import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()
import config from '../config/config.js'

export const db_connect = (url = config.mongoUri, opts = {}) => {

    mongoose.Promise = global.Promise
    mongoose.connect(
        url,
        { ...opts, useNewUrlParser: true }
    )
    mongoose.connection.on('error', () => {
        throw new Error(`unable to connect to database: ${url}`)
    })
}