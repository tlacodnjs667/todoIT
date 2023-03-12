import AppDataSource from '../../data-source';
import { User } from '../../entity/User';
import { Category } from '../../entity/Category';
import { Todo } from '../../entity/Todo';

async function signup(
	name: string,
	email: string,
	password: string
): Promise<User> {
	// const user = new User();
	const user = await AppDataSource.manager.create(User, {
		name,
		email,
		password,
	});

	await AppDataSource.manager.save(user);

	const defaultCategory = await AppDataSource.manager.create(Category, {
		name,
		user: user.id,
		isDefault: true,
	});

	await AppDataSource.manager.save(defaultCategory);

	const welcomeTodo = await AppDataSource.manager.create(Todo, {
		category: defaultCategory.id,
		todo: 'todoIT에 오신 걸 환영합니다!',
		user,
		progressDate: new Date(),
	});

	const howTodo = await AppDataSource.manager.create(Todo, {
		category: defaultCategory.id,
		todo: '카테고리별 할일을 추가하시거나, 일기를 작성하실 수 있습니다!',
		user,
		progressDate: new Date(),
	});

	await AppDataSource.manager.save([welcomeTodo, howTodo]);

	return user;
}

async function signin(email: string, password: string): Promise<User> {
	const [userInfoInDB] = await AppDataSource.manager.find(User, {
		where: {
			email,
		},
	});
	return userInfoInDB;
}

export { signup, signin };
