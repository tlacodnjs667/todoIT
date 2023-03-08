import { NextFunction, Request, Response } from 'express';
import { CustomizedError } from './IError';

function globalErrorHandler(
	err: CustomizedError,
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.error(err.stack);
	err.statusCode = err.statusCode || 500;
	res.status(err.statusCode).json({ message: err.message });
}

export default globalErrorHandler;
