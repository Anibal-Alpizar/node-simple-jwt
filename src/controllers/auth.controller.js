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

router.post('/signin', (req, res, next) => {
    res.json({ message: 'signin' })
})

router.get('/me', async (req, res, next) => {
    const token = req.headers['x-access-token']
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        })
    }
    // verify token
    const decoded = jwt.verify(token, config.secret);
    console.log(decoded) // { id: '5f9b7b7b7b7b7b7b7b7b7b7b' } the user id

    const userFound = await User.findById(decoded.id,
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


export default router