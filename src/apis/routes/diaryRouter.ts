import * as express from 'express';
const router = express.Router();
import { checkAuthentication } from '../utils/checkAuthentication';
import * as diaryController from '../controllers/diaryController';

router.get('', checkAuthentication, diaryController.getDiaries);
router.post('', checkAuthentication, diaryController.writeDiaries);
router.delete('/:diaryId', checkAuthentication, diaryController.deleteDiary);
router.put('', checkAuthentication, diaryController.rewriteDiaries);

export default router;
