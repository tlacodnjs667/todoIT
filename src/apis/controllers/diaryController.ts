import { Response } from 'express';
import * as diaryService from '../services/diaryService';
import { catchAsync } from '../utils/error';
import { CustomizedRequest } from '../utils/IRequest';

const getDiaries = catchAsync(async (req: CustomizedRequest, res: Response) => {
	//userId를 받아서 이에 해당하는 다이어리 가져오기.
	//offset과 limit을 주면 좋을 것 같고, 최신순으로 order를 주었으면!
	//프론트 단 화면을 상상해보자면, 페이지네이션을 사용하였으면 좋겠음!
	//그렇기 때문에 해당 user의 총 일기 갯수도 반환하는 것이 좋겠음!

	//diary에 날짜 필터가 있으면 참 좋을 것 같은데, 기간 내로 할지, 하루하루로 할 지 못 정하겠어.
	// diary랑 todo랑 같이 반환할 수 있으면 참 좋을텐데 이걸 어떻게 할까
	const { user } = req;
	const { offset } = req.params;

	const result = await diaryService.getDiaries(user, +offset);
	//프론트에서 페이지 네이션에 알맞은 값을 보내줄지, 아니면 백에서 처리할 지를 골라야함.

	return res.status(200).json({ message: 'INFORMATION_RETURNED', result });
});
const writeDiaries = catchAsync(
	async (req: CustomizedRequest, res: Response) => {
		const { user } = req;
		const { title, content, date } = req.body;

		const diary = await diaryService.writeDiaries(user, title, content, date);

		return res.status(201).json({ message: 'DIARY_CREATED', diary });
	}
);
const deleteDiary = catchAsync(
	async (req: CustomizedRequest, res: Response) => {
		const { user } = req;
		const { diaryId } = req.params;

		await diaryService.deleteDiary(user, +diaryId);
		return res.status(204).json({ message: 'DIARY_DELETED' });
	}
);
const rewriteDiaries = catchAsync(
	async (req: CustomizedRequest, res: Response) => {
		const { user } = req;
		const { diaryId, title, content } = req.body;

		await diaryService.rewriteDiaries(user, diaryId, title, content);

		return res.status(205).json({ message: 'DIARY_MODIFIED' });
	}
);

export { getDiaries, writeDiaries, deleteDiary, rewriteDiaries };
