const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function genPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return {
        salt,
        hash
    }
}

function validPassword(password, hash, salt) {
    const hashVerify = bcrypt.hashSync(password, salt);
    return hash === hashVerify
}

function genToken(data, secret) {
    const token = jwt.sign(data, secret, { expiresIn: '10d' });
    return token;
}

async function JWTVerify(req, res, next) {
    const authorization = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(authorization, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            error: error,
            message: 'Authentication failed'
        })
    }
}

module.exports = { validPassword, genPassword, genToken, JWTVerify }