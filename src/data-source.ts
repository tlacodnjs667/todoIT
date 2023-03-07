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

//왜 여기에다 AppDataSource.initialize() 쓰면 서버가 안 켜질까
//즌쯔 궁금하다...
