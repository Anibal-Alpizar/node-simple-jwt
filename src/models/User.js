import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    userName: String,
    email: String,
    password: String
})

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10) // 10 is the number of rounds
    return bcrypt.hash(password, salt) // hash the password with the salt
   
}

export default model('User', userSchema)