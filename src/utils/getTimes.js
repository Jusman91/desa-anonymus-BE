export const currentMonth = new Date().getMonth() + 1;
export const currentYear = new Date().getFullYear();

export const giveCurrentDateTime = () => {
	const today = new Date();
	const date = `${currentYear}-${currentMonth}-${today.getDate()}`;
	const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
	const dateTime = `${date} ${time}`;
	return { dateTime };
};
