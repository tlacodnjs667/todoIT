import AppDataSource from '../../data-source';
import { Category } from '../../entity/Category';

function getCategory(userId: number) {
	return AppDataSource.manager.findBy(Category, {
		userId,
	});
}

function checkCateogryBeforeAction(
	userId: number,
	categoryId?: number | number[]
) {
	return AppDataSource.manager.findBy(Category, {
		userId,
		id: categoryId,
	});
}

function createCategory(name: string, userId: number) {
	return AppDataSource.manager.insert(Category, {
		name,
		userId,
	});
}
function deleteCategory(userId: number, categoryId: number | number[]) {
	return AppDataSource.manager.delete(Category, { id: categoryId, userId });
}
function modifyCategory(userId: number, categoryId: number, name?: string) {
	return AppDataSource.manager.update(
		Category,
		{ userId, id: categoryId },
		{ name }
	);
} // Default 일 때는 조건에 따라 변경되어야 하는데 이를 잘 체크하기

export {
	getCategory,
	checkCateogryBeforeAction,
	createCategory,
	deleteCategory,
	modifyCategory,
};
