const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

// Custom middleware to verify the token
// middleware - we need this verification to happen BEFORE we hit the protected route
const verifyToken = (request, response, next) => {
    
    // our token will be located in the request headers if it exists
    // Authorization headers are for tokens
    const token = request.header('Authorization')

    if (!token) {
        // 401 - unauthrized - token not provided
        // in middleware, need to return response to end middleware function
        return response.status(401).json({
            message: 'failure',
            payload: 'Token not provided'
        })
    }

    // Now that they have the token!
    // Verify the token against our secret key!!
    // if successful, returns our token data
    const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY)

    // we can attach that tokenData to our request!!!
    request.username = tokenData.username

    // "next()" function bring us to our protected route
    next();
}

module.exports = verifyToken;