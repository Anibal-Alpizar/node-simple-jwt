import jwt from 'jsonwebtoken'
import config from '../config.js'

const verifyToken = async (req, res, next) => {
    const token = req.headers['x-access-token']
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        })
    }
    const decoded = jwt.verify(token, config.secret)
    req.userId = decoded.id
    next()
}

export default verifyToken