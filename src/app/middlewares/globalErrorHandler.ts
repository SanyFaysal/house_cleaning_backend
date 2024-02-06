import { ErrorRequestHandler } from 'express';

// Global error handler
export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err);

    // Set a default status code if not provided
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        success: false,
        message: 'Internal Server Error',
        errorMessages: [
            {
                path: req.originalUrl,
                message: err.message || 'Something went wrong',
            },
        ],
    });
};

// Register the global error handler

