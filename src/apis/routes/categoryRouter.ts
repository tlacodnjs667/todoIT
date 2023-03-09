import * as express from 'express';
import { checkAuthentication } from '../utils/checkAuthentication';
const router = express.Router();
import * as categoryController from '../controllers/categoryController';

router.get('', checkAuthentication, categoryController.getCategory);
router.post('/create', checkAuthentication, categoryController.createCategory);
router.post('/delete', checkAuthentication, categoryController.deleteCategory);
router.post('/modify', checkAuthentication, categoryController.modifyCategory);

export default router;

//카테고리 get => Todo List와 함께 get하는 과정?
//카테고리 생성 (최대 개수 5개까지 => 5개가 넘을 경우 에러)
//카테고리 삭제(default 카테고리인 경우, 삭제되면 안 됨)
//카테고리 수정 =>

//모든 생성, 수정, 삭제에 해당 유저의 카테고리가 맞는지 확인
