/*
    When i signup, i will receive a token
    When i logout, i will receive a token

    why do i need a token?
    - when i visit a route, the server will check if i have a token
    - if i have a token, i can visit the route or request data
    - if i don't have a token, i can't visit the route or request data

    Resume: its a simple way to authorization & credential validation
*/

import { Router } from 'express'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import verifyToken from './verifyToken.js'

const router = Router()

router.post('/signup', async (req, res, next) => {

    const { userName, email, password } = req.body

    const user = new User({
        userName,
        email,
        password
    })

    user.password = await User.encryptPassword(user.password)
    const userSaved = await user.save()
    console.log(user)

    // create a token
    // paylod = user id
    const token = jwt.sign({ id: userSaved._id }, config.secret, {
        expiresIn: 60 * 60 * 24 // 24 hours
    })
    res.status(200).json({ auth: true, token })
})

router.post('/signin', async (req, res, next) => {
    // if the user exists, return a token
    // if the user doesn't exist, return a message
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(404).send('The user doesnt exists')

    const validPassword = await User.comparePassword(password, user.password) // emailFound.password is the hashed password
    if (!validPassword) return res.status(401).json({ auth: false, token: null })

    const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 60 * 60 * 24 // 24 hours
    })
    res.json({ auth: true, token })
})

router.get('/me', verifyToken, async (req, res, next) => {

    const userFound = await User.findById(req.userId, // req.userId is the id that we get from the verifyToken middleware
        {
            password: 0 // don't show the password field in the response
        })

    if (!userFound) {
        return res.status(404).json({
            message: 'No user found'
        })
    }
    res.json(userFound)
})

router.get('/dashboard', verifyToken, async (req, res, next) => {
    res.json({
        message: 'Welcome to the dashboard'
    })
})

export default router