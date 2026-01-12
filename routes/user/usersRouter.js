const express = require('express');
const { createUser } = require('./usersController');
const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const newUser = await createUser(request.body)
        response.status(200).json({ message: 'success', payload: newUser })
    } catch (error) {
        response.status(500).json({ message: 'failure', payload: error.message })
    }
})

module.exports = router