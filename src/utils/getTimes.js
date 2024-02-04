export const giveCurrentDateTime = () => {
	const today = new Date();
	const date = `${today.getFullYear()}-${
		today.getMonth() + 1
	}-${today.getDate()}`;
	const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
	const dateTime = `${date} ${time}`;
	return { dateTime };
};

export const getCurrentDateCreateGte = () => {
	const currentMonth = new Date().getMonth() + 1;
	const currentYear = new Date().getFullYear();
	const gte = new Date(`${currentYear}-${currentMonth}-01`);
	return gte;
};

export const getCurrentDateCreateLt = () => {
	const currentMonth = new Date().getMonth() + 1;
	const currentYear = new Date().getFullYear();
	let nextMonth = currentMonth + 1;
	let nextYear = currentYear;
	if (nextMonth > 12) {
		nextMonth = 1; // Kembali ke bulan Januari
		nextYear++; // Tambahkan tahun berikutnya
	}
	const lt = new Date(`${nextYear}-${nextMonth}-01`);
	return lt;
};
