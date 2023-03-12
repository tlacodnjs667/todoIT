import * as diaryDao from '../models/diaryDao';

const getDiaries = async (user: number, skip: number) => {
	const diaryList = await diaryDao.getDiaries(user, skip);
	const countByUser = await diaryDao.getCountForPagenation(user);

	return { diaryList, countByUser };
};
const writeDiaries = async (
	user: number,
	title: string,
	content: string,
	date?: Date
) => {
	if (!date) {
		date = new Date();
	}

	const diary = await diaryDao.writeDiaries(user, title, content, date);
	return diary;
};
const deleteDiary = async (user: number, diaryId: number) => {
	const [diaryById] = await diaryDao.checkDiaryOfMaster(diaryId);
	if (diaryById.user !== user) throw new Error(`CANNOT_DELETE_OTHER'S_DIARY`);
	return await diaryDao.deleteDiary(diaryId);
};
const rewriteDiaries = async (
	user: number,
	diaryId: number,
	title?: string,
	content?: string
) => {
	const [diaryById] = await diaryDao.checkDiaryOfMaster(diaryId);
	if (diaryById.user !== user) throw new Error(`CANNOT_MODIFY_OTHER'S_DIARY`);

	return await diaryDao.rewriteDiaries(diaryId, title, content);
};

export { getDiaries, writeDiaries, deleteDiary, rewriteDiaries };
