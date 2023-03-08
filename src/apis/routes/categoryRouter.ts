import * as express from 'express';
const router = express.Router();

router.post('get');
router.post('create');
router.post('delete');
router.post('modify');

export default router;

//카테고리 get => Todo List와 함께 get하는 과정?
//카테고리 생성 (최대 개수 5개까지 => 5개가 넘을 경우 에러)
//카테고리 삭제(default 카테고리인 경우, 삭제되면 안 됨)
//카테고리 수정 =>

//모든 생성, 수정, 삭제에 해당 유저의 카테고리가 맞는지 확인
