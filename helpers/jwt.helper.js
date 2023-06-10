const jwt = require('jsonwebtoken');
const response = require('./response.helper');
const TOKEN_SECRET = "token";

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return response.error(res, "Missing token", 401);
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return response.error(res, "Bad token", 401);
        req.user = user
        next()
    })
}

function generateAccessToken(username) {
    return jwt.sign({data: username}, TOKEN_SECRET, { expiresIn: '24h' });
}

module.exports = {
    authenticateToken,
    generateAccessToken
}
