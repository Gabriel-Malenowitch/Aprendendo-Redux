export const alphabetic = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
export const getRandomArbitrary = (min: number, max: number): number => Math.floor(Math.random() * (max - min) + min);
export const alphabeticGenerator = () => {
	const generator = () => alphabetic[getRandomArbitrary(0, alphabetic.length-1)]; let text = "";
	for(let i = 0; i < getRandomArbitrary(7, 15); i++) text += generator();
	return text;
};
export const listAlphabeticGenerator = (size: number) => {
	const list = []; 
	for(let i = 0; i < size; i++) list.push({id: i, word: alphabeticGenerator()});
	return list;
};