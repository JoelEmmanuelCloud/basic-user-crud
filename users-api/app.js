const express = require('express');
const app = express();
const users = require('./routes/users');
const connectDB = require('./database/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.use(express.json());

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const { message, error, errors } = err;
  
    res.status(statusCode).json({ statusCode, message, error, errors });
  });
  
app.use('/api/v1/users', users);

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;

const start = async () => {
try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
    console.log(`Server is listening on port ${port}...`)
    );
} catch (error) {
    console.log(error);
}
};

start();
