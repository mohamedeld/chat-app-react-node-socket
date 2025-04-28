import { NextFunction, Request, Response } from "express";

interface AsyncHandlerFunction {
    (request: Request, response: Response, next: NextFunction): Promise<void>;
}

const asyncHandler = (fn: AsyncHandlerFunction) => {
    return (request: Request, response: Response, next: NextFunction) => {
        fn(request, response, next).catch(next);
    };
};

export default asyncHandler;