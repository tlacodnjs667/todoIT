import AppDataSource from '../../data-source';
import { User } from '../../entity/User';
import { Category } from '../../entity/Category';
import { Todo } from '../../entity/Todo';

async function signup(
	name: string,
	email: string,
	password: string
): Promise<User> {
	const user = new User();
	user.name = name;
	user.email = email;
	user.password = password;
	await AppDataSource.manager.save(user);

	const defaultCategory = new Category();
	defaultCategory.name = '기본';
	defaultCategory.userId = user;
	defaultCategory.isDefault = true;
	await AppDataSource.manager.save(defaultCategory);

	const welcomeTodo = new Todo();
	welcomeTodo.category = defaultCategory;
	welcomeTodo.todo = 'todoIT에 오신 걸 환영합니다!';
	welcomeTodo.user = user;
	welcomeTodo.progressDate = new Date();

	const howTodo = new Todo();
	howTodo.category = defaultCategory;
	howTodo.todo = '카테고리별 할일을 추가하시거나, 일기를 작성하실 수 있습니다!';
	howTodo.user = user;
	howTodo.progressDate = new Date();

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
