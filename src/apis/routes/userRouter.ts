import { Router } from 'express';
const routes = Router();

import * as userController from '../controllers/userController';

routes.post('/signup', userController.signup);
routes.post('/signin', userController.signin);

export default routes;
