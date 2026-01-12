const express = require('express');
const { createUser, loginUser } = require('./usersController');
const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const newUser = await createUser(request.body)
        response.status(200).json({ message: 'success', payload: newUser })
    } catch (error) {
        response.status(500).json({ message: 'failure', payload: error.message })
    }
})

// We use post for login because we are sending data in the body
// and we don't want that info to be visible in the URL like with a get request
router.post('/login', async (request, response) => {
    try {
        const userLoggedIn = await loginUser(request.body)
        response.status(200).json({ message: 'success', payload: `${userLoggedIn.username} - Successfully logged in` })
    } catch (error) {
        response.status(500).json({ message: 'failure', payload: error })
    }
})

module.exports = router