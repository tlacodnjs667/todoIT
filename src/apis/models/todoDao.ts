import AppDataSource from '../../data-source';
import { Todo } from '../../entity/Todo';

function checkMasterOfTodo(todoId: number) {
	return AppDataSource.manager.findBy(Todo, {
		todoId,
	});
}

function getTodoList(
	user: number,
	category?: number,
	isFinished?: boolean,
	progressDate?: Date
) {
	return AppDataSource.manager.find(Todo, {
		where: {
			user: user,
			category,
			isFinished,
			progressDate,
		},
		order: {
			isFinished: 'ASC',
			id: 'ASC',
		},
	});
}
// 흠... 들어오는 값과 아닌 값에 따라 where
async function makeTodo(
	user: number,
	category: number,
	todo: string,
	progressDate: Date,
	memo?: string
) {
	const todoToSave = await AppDataSource.manager.create(Todo, {
		user,
		category,
		todo,
		progressDate,
		memo,
	});

	await AppDataSource.manager.save(todoToSave);

	return todoToSave;
}
function deleteTodo(todoId: number) {
	return AppDataSource.manager.delete(Todo, todoId);
}
function modifyTodo(
	todoId: number,
	memo?: string,
	isFinished?: boolean,
	todo?: string,
	progressDate?: Date
) {
	return AppDataSource.manager.update(Todo, todoId, {
		memo,
		isFinished,
		todo,
		progressDate,
	});
}

export { checkMasterOfTodo, getTodoList, makeTodo, deleteTodo, modifyTodo };
