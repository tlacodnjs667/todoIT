import { Request, Response } from 'express';
import { CustomizedRequest } from '../utils/IRequest';
import * as categoryService from '../services/categoryService';

async function getCategory(req: CustomizedRequest, res: Response) {
	const result = await categoryService.getCategory(req.user);
	return res.status(202).json({ message: 'SUCCESS', result });
}
async function createCategory(req: CustomizedRequest, res: Response) {
	//카테고리 만들 때 필요한 것 => ID, Category 명, userId
	const { user } = req;
	const { name } = req.body;

	if (!user || !name) throw new Error('NOT_FOUND_REQUESTED_ELEMENT');
	await categoryService.createCategory(user, name);

	return res.status(201).json({ message: 'CATEGORY_CREATED' });
}
async function deleteCategory(req: CustomizedRequest, res: Response) {
	const { user } = req;
	const { categoryId } = req.body;

	if (!user || !categoryId) throw new Error('NOT_FOUND_REQUESTED_ELEMENT');
	await categoryService.deleteCategory(user, categoryId);

	return res.status(204).json({ message: 'CATEGORY_DELETED' });
}
async function modifyCategory(req: CustomizedRequest, res: Response) {
	const { user } = req;
	const { categoryId, name } = req.body;
	if (!user || !categoryId) throw new Error('NOT_FOUND_REQUESTED_ELEMENT');
	await categoryService.modifyCategory(user, categoryId, name);
	return res.status(205).json({ message: 'INFORMATION_MODIFIED' });
	//205 =>     RESET_CONTENT
}

export { getCategory, createCategory, deleteCategory, modifyCategory };
