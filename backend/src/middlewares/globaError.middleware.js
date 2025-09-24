const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: err.success ?? false,
    message: err.message || "Internal Server Error",
    error: err.error || [],
    data: err.data || null,
  });
};

export { errorMiddleware };
