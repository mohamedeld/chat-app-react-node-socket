import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
    statusCode?: number;
    status?: string;
}

const errorForDev = (error: CustomError, response: Response) => {
    response.status(error.statusCode || 500).json({
        status: error.status || 'error',
        message: error,
        stack: error.stack,
    });
};

const errorForProd = (error: CustomError, response: Response) => {
    response.status(error.statusCode || 500).json({
        status: error.status || 'error',
        message: error.message,
    });
};

const globalError = (error: CustomError, request: Request, response: Response, next: NextFunction) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        errorForDev(error, response);
    } else {
        errorForProd(error, response);
    }
};

export default globalError;