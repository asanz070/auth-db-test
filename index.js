const express = require('express');
const logger = require("morgan");

const connectToMongoDB = require('./database/connectToMongoDB')

const app = express();

const PORT = 3000;

app.use(logger("dev"))
app.use(express.json())

const userRouter = require('./routes/user/usersRouter')
app.use('/api/users', userRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
    connectToMongoDB()
})