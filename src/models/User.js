import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    userName: String,
    email: String,
    password: String
})

export default model('User', userSchema)