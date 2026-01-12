// Start with Models to setup your data first. If you start with your routes you need your controller file done for it to work

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },

    {
        timestamps: true
    }
)

// Set up the model here
// Remember, this talks to the Database
const User = mongoose.model('User', userSchema)
module.exports = User