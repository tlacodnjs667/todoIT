import { Request, Response } from 'express';
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import routes from './apis/routes';
import AppDataSource from './data-source';
import { globalErrorHandler } from './apis/utils/error';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(routes);
app.use(globalErrorHandler);

//사용 순서에 대해 생각해본 적이 없음 => 코드는보통 위부터 아래부터, 그러면 routes 밑에 globalErrorHandler가 존재해야 하는 이유가 있네.
//app.use(미들웨어 이름) 실행 순서에 대해 이야기해볼 필요성이 있을듯!!!

app.get('/ping', async (req: Request, res: Response) => {
	return res.status(200).json({ message: 'PONG' });
});

const start = () => {
	try {
		app.listen(3000, () => console.log('SERVER IS LISTENING ON PORT 3000'));

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
