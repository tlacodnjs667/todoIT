import { Router } from 'express';
const routes = Router();

import * as userController from '../controllers/userController';

routes.post('/signup', userController.signup);

export default routes;
