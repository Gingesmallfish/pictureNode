const jwt = require('jsonwebtoken')


function generateToken(payload, secret, expiresIn) {
    return jwt.sign(payload, secret, {expiresIn});
}


function verifyToken(token, secret) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}


module.exports = {
    generateToken,
    verifyToken
}