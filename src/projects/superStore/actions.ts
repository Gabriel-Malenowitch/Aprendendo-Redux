export const addCart = (data: any) => {
	return {
		type: "addCart",
		item: data,
	};
};
export const removeCart = (data: any, index: number) => {
	return {
		type: "removeCart",
		item: data,
		index: index,
	};
};
