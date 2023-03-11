import * as express from 'express';
const router = express.Router();
import * as todoController from '../controllers/todoController';
import { checkAuthentication } from '../utils/checkAuthentication';

router.get('', checkAuthentication, todoController.getTodoList);
router.post('', checkAuthentication, todoController.makeTodo);
router.delete('', checkAuthentication, todoController.deleteTodo);
router.put('', checkAuthentication, todoController.modifyTodo);

export default router;

//Todolist 반환 [get] endpoint: "/todo" => todo
// => Todolist 반환 시, 날짜, 완료 여부에 따라 필터링 필요
//Todolist 생성 [Post] endpoint: "/todo" => todo
//Todolist 수정 [Put] endpoint: "/todo" => todo, memo, isFinished, progressDate, categoryId  []
//Todolist 삭제 [delete] endpoint: "/todo" => todo
