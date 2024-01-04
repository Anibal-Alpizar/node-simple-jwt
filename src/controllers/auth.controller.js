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

    res.status(200).json(userSaved)
})

router.post('/signin', (req, res, next) => {
    res.json({ message: 'signin' })
})

router.get('/me', (req, res, next) => {
    res.json({ message: 'me' })
})


export default router