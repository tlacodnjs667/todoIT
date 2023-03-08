import * as userDao from '../models/userDao';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

async function signup(
	name: string,
	email: string,
	password: string
): Promise<string> {
	const hashedPassword = await bcrypt.hash(password, +process.env.SALTROUNDS);
	const userInDB = await userDao.signup(name, email, hashedPassword);
	return jwt.sign(
		{ userId: userInDB.id, email: userInDB.email },
		process.env.JWT_SECRETKEY,
		{ expiresIn: '2h' }
	);
}

async function signin(email: string, password: string): Promise<string> {
	const userInDB = await userDao.signin(email, password);

	if (!bcrypt.compare(password, userInDB.password)) {
		throw new Error('NOT_MATCH_PASSWORD');
	}

	return jwt.sign(
		{ userId: userInDB.id, email: userInDB.email },
		process.env.JWT_SECRETKEY,
		{ expiresIn: '2h' }
	);
}
export { signup, signin };
