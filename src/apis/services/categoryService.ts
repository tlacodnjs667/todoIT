import * as categoryDao from '../models/categoryDao';

function getCategory(userId: number) {
	return categoryDao.getCategory(userId);
}
async function createCategory(userId: number, name: string) {
	/*
    1. 해당 유저의 category 개수가 5개를 넘지 않는지 체크
    2. 해당 유저의 중복 이름이 존재하는지 체크 
    정도??
    */
	const checkCategoryCount = await categoryDao.checkCateogryBeforeAction(
		userId
	);

	console.log(checkCategoryCount);
	if (checkCategoryCount.length >= 5)
		throw new Error('CANNOT_MAKE_BEYOND_MAX_CATEGORY');

	const result = await categoryDao.createCategory(name, userId);
	console.log(result);
	return result;
}
async function deleteCategory(userId: number, categoryId: number | number[]) {
	const checkCategoryMadeByUser = await categoryDao.checkCateogryBeforeAction(
		userId,
		categoryId
	);

	if (!checkCategoryMadeByUser.length)
		throw new Error('CANNOT_FOUND_DATA_ACCORDING_TO_THE_CRITERIA');

	if (checkCategoryMadeByUser[0].isDefault)
		throw new Error('CAN_NOT_DELETE_DEFAULT_CATEGORY');

	return categoryDao.deleteCategory(userId, categoryId);
}
async function modifyCategory(
	userId: number,
	categoryId: number,
	name?: string,
	isDefault?: boolean
) {
	const InfoTocheck = await categoryDao.checkCateogryBeforeAction(
		userId,
		categoryId
	);

	if (!InfoTocheck.length)
		throw new Error('CANNOT_FOUND_DATA_ACCORDING_TO_THE_CRITERIA');

	await categoryDao.modifyCategoryName(userId, categoryId, name);
}

export { getCategory, createCategory, deleteCategory, modifyCategory };
