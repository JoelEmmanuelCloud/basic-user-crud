require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const connectDB = require('./database/connect');

const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');

app.use(express.json());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', usersRoute);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server started at ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();