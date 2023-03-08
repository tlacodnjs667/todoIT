import { Request } from 'express';

export interface CustomizedRequest extends Request {
	user: number;
}
