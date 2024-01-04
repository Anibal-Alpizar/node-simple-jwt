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

const router = Router()

router.post('/signup', (req, res, next) => {
    res.json({ message: 'signup' })
})

router.post('/signin', (req, res, next) => {
    res.json({ message: 'signin' })
})

router.get('/me', (req, res, next) => {
    res.json({ message: 'me' })
})


export default router