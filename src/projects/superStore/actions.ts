export const addCart = (data: any) => {
	return {
		type: "addCart",
		item: data,
	};
};