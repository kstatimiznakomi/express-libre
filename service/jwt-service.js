const jwt = require('jsonwebtoken')
const config = require('../config/config')
const generateToken = (req, user) => {
    const payload = {id: user.id, username: user.username, role: user.role, password: user.password}
    const token = jwt.sign(payload, config.SECRET_TOKEN)
    return token
}

const verifyUser = (req, res, next) => {
    const token = req.headers.token
    if (!token) return res.status(401).send("Access Denied / Unauthorized request")
    console.log(jwt.verify(token, config.SECRET_TOKEN))
}

module.exports = {generateToken, verifyUser}