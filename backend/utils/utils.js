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

function verifyToken(token, secret) {
    return jwt.verify(token, secret);
}

module.exports = { validPassword, genPassword, genToken }