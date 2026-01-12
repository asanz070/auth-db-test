const express = require('express');
const { createUser, loginUser } = require('./usersController');
const router = express.Router();

const verifyToken = require('../../middleware/authmiddleware')

//GET route
// can only access profile if you are logged in with your token
// we can add middleware parameters between our "url_route" and callback
// we will attempt to verify our user before we hit the route
router.get('/profile', verifyToken, (request, response) => {
    try {
        response.json({ message: 'success', payload: `Successfully Verified Token for ${request.username}` })
    } catch (error) {
        response.status(500).json({ message: 'failure', payload: error.message })
    }
})

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

        // Commenting this code out because we are now returning a token instead of the user info
        // const userLoggedIn = await loginUser(request.body)
        // response.status(200).json({ message: 'success', payload: `${userLoggedIn.username} - Successfully logged in` })

        // This will return the token instead, which we can use for authentication.
        const token = await loginUser(request.body);
        response.json({
            message: "success",
            payload: token
        })

    } catch (error) {
        response.status(500).json({ message: 'failure', payload: error })
    }
})

module.exports = router