import { Request, Response } from 'express';
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import routes from './apis/routes';
import AppDataSource from './data-source';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(routes);

app.get('/ping', async (req: Request, res: Response) => {
	return res.status(200).json({ message: 'PONG' });
});

const start = (): void => {
	try {
		app.listen(3000, () => {
			console.log('SERVER IS LISTENING ON PORT 3000');
		});
		AppDataSource.initialize()
			.then(() => {
				console.log('DATASOURCE HAS BEEN INITIALIZED');
			})
			.catch((error: any) => {
				console.log(error);
				AppDataSource.destroy();
			});
	} catch (error) {
		console.log(error);
	}
};

start();

// const user = new User()
// user.firstName = "Timber"
// user.lastName = "Saw"
// user.age = 25
// await AppDataSource.manager.save(user)
// console.log("Saved a new user with id: " + user.id)

// console.log("Loading users from the database...")
// const users = await AppDataSource.manager.find(User)
// console.log("Loaded users: ", users)

// console.log("Here you can setup and run express / fastify / any other framework.")
