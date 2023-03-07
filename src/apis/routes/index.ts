import { Router } from 'express';
const router = Router();

import userRouter from './userRouter';
import categoryRouter from './categoryRouter';
import todoRouter from './todoRouter';
import diaryRouter from './diaryRouter';

router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/todo', todoRouter);
router.use('/diary', diaryRouter);

export default router;
