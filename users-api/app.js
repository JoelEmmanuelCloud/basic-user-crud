require('dotenv').config();
const express = require('express');
require('express-async-errors');

const app = express();

app.use(express.json());

app.get('/', (req,res) => {
    res.status(200).json({
        message: 'Hello World'
    });
});

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        app.listen(port, console.log(`Server started at ${port}`));
    } catch (error) {
        console.log(error);
    }
};

start();
