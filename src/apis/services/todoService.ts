import * as todoDao from '../models/todoDao';

function getTodolist(userId: number, reqBody: conditionToSelect) {
	console.log(reqBody);
	// return todoDao.getTodoList(userId, reqBody);
}
interface conditionToSelect {
	category: number;
	isFinished: boolean;
	progressDate: Date;
}
async function makeTodo(
	user: number,
	category: number,
	todo: string,
	progressDate: Date,
	memo?: string
) {
	return todoDao.makeTodo(user, category, todo, progressDate, memo);
}
async function deleteTodo(user: number, todoId: number) {
	const [checkTodo] = await todoDao.checkMasterOfTodo(todoId);
	if (checkTodo.userId !== user) throw new Error(`CANNOT_DELETE_OTHER'S`);

	return todoDao.deleteTodo(todoId);
	// todoId 와 userId => 해당 엔티티가 있는지 확인 후 삭제과정
}
async function modifyTodo(
	user: number,
	todoId: number,
	memo?: string,
	isFinished?: boolean,
	todo?: string,
	progressDate?: Date
) {
	const checkTodo = await todoDao.checkMasterOfTodo(todoId);
	if (checkTodo.userId !== user) throw new Error(`CANNOT_DELETE_OTHER'S`);

	return todoDao.modifyTodo(todoId, memo, isFinished, todo, progressDate);
}

export { getTodolist, makeTodo, deleteTodo, modifyTodo };
