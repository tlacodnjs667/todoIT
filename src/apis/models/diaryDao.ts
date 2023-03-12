//userId를 받아서 이에 해당하는 다이어리 가져오기.
//offset과 limit을 주면 좋을 것 같고, 최신순으로 order를 주었으면!
//프론트 단 화면을 상상해보자면, 페이지네이션을 사용하였으면 좋겠음!

import AppDataSource from '../../data-source';
import { Diary } from '../../entity/Diary';
import { IModifyType } from '../utils/IResponse';

const checkDiaryOfMaster = async (diaryId: number): Promise<Diary[]> => {
	return AppDataSource.manager.find(Diary, {
		where: {
			id: diaryId,
		},
		relations: {
			user: true,
		},
	});
};

const getDiaries = async (user: number, offset: number): Promise<Diary[]> => {
	return AppDataSource.manager.find(Diary, {
		select: {
			id: true,
			title: true,
			content: true,
			targetDate: true,
		},
		relations: {
			user: true,
		},
		where: {
			'user.id': user,
		},
	});
}; // user 테이블 join 시 password 함께 반환되는 문제 해결 필요.
//그렇기 때문에 해당 user의 총 일기 갯수도 반환하는 것이 좋겠음!
const getCountForPagenation = (user: number): Promise<number> => {
	return AppDataSource.manager.countBy(Diary, { user });
}; // 개수 타입 어떻게 나오는지 확인해야 함

const writeDiaries = async (
	user: number,
	title: string,
	content: string,
	date: Date
): Promise<Diary> => {
	const diaryToSave = await AppDataSource.manager.create(Diary, {
		user,
		title,
		content,
		targetDate: date,
	});

	await AppDataSource.manager.save(diaryToSave);

	return diaryToSave;
};

const deleteDiary = async (diaryId: number) => {
	const result = await AppDataSource.manager.delete(Diary, diaryId);

	return result;
};

const rewriteDiaries = async (
	diaryId: number,
	title: string,
	content: string
): Promise<IModifyType> => {
	const result = await AppDataSource.manager.update(Diary, diaryId, {
		title,
		content,
	});
	console.log(result);
	return result;
};

export {
	checkDiaryOfMaster,
	getDiaries,
	getCountForPagenation,
	writeDiaries,
	deleteDiary,
	rewriteDiaries,
};
