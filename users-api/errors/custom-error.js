class CustomAPIError extends Error {
    constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.error = statusCode >= 400 && statusCode < 500 ? 'Not Found Error' : 'Server Error';
    }
}

const createCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode);
};

module.exports = { createCustomError, CustomAPIError };