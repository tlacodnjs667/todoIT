//userId를 받아서 이에 해당하는 다이어리 가져오기.
//offset과 limit을 주면 좋을 것 같고, 최신순으로 order를 주었으면!
//프론트 단 화면을 상상해보자면, 페이지네이션을 사용하였으면 좋겠음!

import AppDataSource from '../../data-source';
import { Diary } from '../../entity/Diary';
const checkDiaryOfMaster = async (diaryId: number) => {
	return AppDataSource.manager.find(Diary, diaryId);
};
//그렇기 때문에 해당 user의 총 일기 갯수도 반환하는 것이 좋겠음!
const getDiaries = async (user: number, offset: number) => {
	return AppDataSource.manager.find(Diary, { user, skip: offset, take: 10 });
};

const getCountForPagenation = (user: number) => {
	return AppDataSource.manager.countBy(Diary, { user });
};

const writeDiaries = async (
	user: number,
	title: string,
	content: string,
	date: Date
) => {
	const diaryToSave = await AppDataSource.manager.create(Diary, {
		user,
		title,
		content,
	});

	await AppDataSource.manager.save(diaryToSave);

	return diaryToSave;
};
const deleteDiary = async (diaryId: number) => {
	return AppDataSource.manager.delete(Diary, diaryId);
};

const rewriteDiaries = async (
	diaryId: number,
	title: string,
	content: string
) => {
	return AppDataSource.manager.update(Diary, diaryId, {
		title,
		content,
	});
};

export {
	checkDiaryOfMaster,
	getDiaries,
	getCountForPagenation,
	writeDiaries,
	deleteDiary,
	rewriteDiaries,
};
