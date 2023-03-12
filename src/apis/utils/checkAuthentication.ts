import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { CustomizedRequest } from './IRequest';

export function checkAuthentication(
	req: CustomizedRequest,
	res: Response,
	next: NextFunction
) {
	if (!req.headers.authorization) throw new Error('NOT_FOUND_AUTHORIZATION');

	const payload = jwt.verify(
		req.headers.authorization,
		process.env.JWT_SECRETKEY
	);

	if (typeof payload === 'object' && payload.userId) {
		req.user = payload.userId;
	}

	next();
}
