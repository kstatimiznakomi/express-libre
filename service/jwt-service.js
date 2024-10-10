const jwt = require('jsonwebtoken')
const config = require('../config/config')
const generateToken = (req, user) => {
    const payload = {id: user.id, username: user.username, role: user.role, password: user.password}
    const token = jwt.sign(payload, config.SECRET_TOKEN)

    return token
}

const accessDenied = (res) => {
    return res.status(401).send("Access Denied / Unauthorized request")
}

const verifyUser = (req) => {
    if (!req.headers.token) return null
    const token = req.headers.token
    return jwt.verify(token, config.SECRET_TOKEN)
}

module.exports = {generateToken, verifyUser, accessDenied}