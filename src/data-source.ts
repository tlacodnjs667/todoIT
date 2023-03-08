import 'reflect-metadata';
import { Category } from './entity/Category';
import { Diary } from './entity/Diary';
import { Todo } from './entity/Todo';
import { User } from './entity/User';
const { DataSource } = require('typeorm');

const AppDataSource = new DataSource({
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: '123123',
	database: 'testtypeorm',
	synchronize: true,
	logging: false,
	entities: [User, Diary, Todo, Category],
	migrations: [],
	subscribers: [],
});

export default AppDataSource;
