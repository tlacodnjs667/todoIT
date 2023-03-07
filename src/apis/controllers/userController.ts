import { Request, Response } from 'express';
import * as userService from '../services/userService';

function signup(req: Request, res: Response) {
	const { name, email, password } = req.body;
	console.log('ddd');

	if (!name || !email || !password)
		res.status(404).json({ message: 'NOT_FOUND_REQUIRED_DATA' });

	userService.signup(name, email, password);

	return res.status(201).json({ message: 'USER_CREATED' });
}

export { signup };
