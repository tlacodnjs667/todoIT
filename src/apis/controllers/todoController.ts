import { Response } from 'express';
import { CustomizedRequest } from '../utils/IRequest';
import * as todoService from '../services/todoService';
import { catchAsync } from '../utils/error';

const getTodoList = catchAsync(
	async (req: CustomizedRequest, res: Response) => {
		const { user } = req;
		const { categoryId, isFinished, progressDate } = req.body;

		const todolist = await todoService.getTodolist(user, req.body);
		return res.status(200).json({ message: 'INFORMATION_RETURNED', todolist });
	}
);

const makeTodo = catchAsync(async (req: CustomizedRequest, res: Response) => {
	const { user } = req;
	const { todo, progressDate, categoryId, memo } = req.body;

	if (!user || !todo || !progressDate || !categoryId)
		throw new Error('UNDEFINED_REQUIRED_INFO');

	const todoList = await todoService.makeTodo(
		user,
		categoryId,
		todo,
		progressDate,
		memo
	);

	return res.status(200).json({ message: 'INFORMATION_RETURNED', todoList });
});

const deleteTodo = catchAsync(async (req: CustomizedRequest, res: Response) => {
	//delete 수행시 필요한 것 => What?
	const { user } = req;
	const { todoId } = req.body;

	if (!user || !todoId) throw new Error('UNDEFINED_REQUIRED_INFO');

	await todoService.deleteTodo(user, todoId);

	return res.status(204).json({ message: 'TODO_DELETED' });
});

const modifyTodo = catchAsync(async (req: CustomizedRequest, res: Response) => {
	const { user } = req;
	const { todoId, memo, isFinished, todo, progressDate } = req.body;

	if (!user || !todoId) throw new Error('UNDEFINED_REQUIRED_INFO');

	await todoService.modifyTodo(user, todoId);

	return res.status(205).json({ message: 'INFORMATION_MODIFIED' });
});

export { getTodoList, makeTodo, deleteTodo, modifyTodo };
