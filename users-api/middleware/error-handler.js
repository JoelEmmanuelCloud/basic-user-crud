const { CustomAPIError } = require('../errors/custom-error');

const errorHandlerMiddleware = async(err, req, res, next) => {

  if (err instanceof CustomAPIError) {
    const json = err.json;

    if (json.error === 'Validation error') {
      return res.status(422).json({
        type: json.error,
        errors: json.errors
      });
    }
    if (json.error) {
      return res.status(json.statusCode).json(json);
    }
    return res.status(json.statusCode).json(json);
  }

  return res.status(500).json({ msg: err });
};

module.exports = errorHandlerMiddleware;
