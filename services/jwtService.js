const {JWT_SECRET} = require("../config")
const jwt =  require('jsonwebtoken')
class jwtService {
    static sign(payload, expiry = '1h', secret = JWT_SECRET) {
        return jwt.sign(payload, secret, {expiresIn: expiry});
    }
}

module.exports = jwtService;