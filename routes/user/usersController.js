// You're gonna set up your logic here
const User = require('./usersModel')
const bcrypt = require('bcrypt')

const createUser = async (userData) => {
    try {
        // 1. Create salt / Generate the salt
        const salt = await bcrypt.genSalt();

        // 2. Encrypt the password
        // Pass in the password from the request body, along with the salt
        const hashedPassword = await bcrypt.hash(userData.password, salt)

        // 3. Create a new user with the hashed password
        // Replace the plain text password with the hashed password
        // Will replace the previous userData object with a new object that has the hashed password
        const secureUserData = {
            username: userData.username,
            password: hashedPassword
        }

        // 4. Save the new user to the database
        const newUser = await User.create(secureUserData)

        // Prevent password from being returned
        const returnedUser = await User.find({ username: userData.username }).select('-password')

        // Return
        return returnedUser
    } catch (error) {
        throw error;
    }
}

module.exports = { createUser }