export interface IDeleteType {
	raw: [];
	affected: number;
}

export interface IModifyType extends IDeleteType {
	generatedMaps: [];
}
