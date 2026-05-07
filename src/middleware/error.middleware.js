const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message    = err.message    || "Internal server error";

  
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message     = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`;
    statusCode  = 409;
  }

  
  if (err.name === "ValidationError") {
    message    = Object.values(err.errors).map((e) => e.message).join(". ");
    statusCode = 400;
  }

  
  if (err.name === "CastError") {
    message    = "Invalid ID format.";
    statusCode = 400;
  }

  
  if (err.code === "LIMIT_FILE_SIZE") {
    message    = "File size must be less than 10MB.";
    statusCode = 400;
  }

  if (process.env.NODE_ENV === "development") {
    console.error("Error:", err);
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
