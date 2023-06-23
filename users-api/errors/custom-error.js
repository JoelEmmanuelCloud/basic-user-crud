class CustomAPIError extends Error {
    constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.error = statusCode >= 400 && statusCode < 500 ? 'Not Found Error' : 'Server Error';

    this.json = {
        statusCode: this.statusCode,
        message: this.message,
        error: this.error
    };
    }
}

const createCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode);
};

module.exports = { createCustomError, CustomAPIError };
