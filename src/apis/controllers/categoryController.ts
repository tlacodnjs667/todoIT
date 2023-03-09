import { Request, Response } from 'express';
import * as categoryService from '../services/categoryService';

async function getCategory(req: Request, res: Response) {}
async function createCategory(userId: number) {}
async function deleteCategory(userId: number) {}
async function modifyCategory(userId: number) {}

export { getCategory, createCategory, deleteCategory, modifyCategory };
