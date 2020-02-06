const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    isAuthorized(req, res, next) {

        const token = req.headers.authorization;
        if (!token) {
            return false
        } else {

            try {
                const verify = jwt.verify(req.headers.authorization.replace('Bearer ', ''), process.env.MYPASS)
                req.user = verify
            } catch (error) {
                res.json({ message: error })
            }

        }
        next()
    }
}
