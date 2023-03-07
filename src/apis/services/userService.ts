import * as userDao from '../models/userDao';
import * as bcrypt from 'bcrypt';

async function signup(
	name: string,
	email: string,
	password: string
): Promise<void> {
	const hashedPassword = await bcrypt.hash(password, +process.env.SALTROUNDS);
	await userDao.signup(name, email, hashedPassword);
}

export { signup };
