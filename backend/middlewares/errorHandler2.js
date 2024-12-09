// errorHandler.js

export const handleValidationError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
  };
  
  export const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
  
    // Mongoose duplicate key error
    if (err.code === 11000) {
      err.statusCode = 400;
      err.message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    }
  
    // Wrong MongoDB ID error
    if (err.name === "CastError") {
      err.statusCode = 400;
      err.message = `Resource not found. Invalid: ${err.path}`;
    }
  
    // Mongoose validation error
    if (err.name === "ValidationError") {
      err.statusCode = 400;
      err.message = Object.values(err.errors)
        .map((error) => error.message)
        .join(", ");
    }
  
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  };
