import { Request, Response } from 'express';
import * as userService from '../services/userService';

async function signup(req: Request, res: Response) {
	const { name, email, password } = req.body;

	if (!name || !email || !password)
		res.status(404).json({ message: 'NOT_FOUND_REQUIRED_DATA' });

	const authorization = await userService.signup(name, email, password);
	return res.status(201).json({ message: 'USER_CREATED', authorization });
}

async function signin(req: Request, res: Response) {
	const { email, password } = req.body;

	if (!email || !password)
		res.status(404).json({ message: 'NOT_FOUND_REQUIRED_DATA' });

	const authorization = await userService.signin(email, password);

	return res.status(202).json({ message: 'JWT_TOKEN_PROVIDED', authorization });
}

export { signup, signin };
