import { currentMonth, currentYear } from './getTimes.js';

export const aggregateCountByMonth = async (model) => {
	try {
		const newDataCountPerMonth = await model.aggregate([
			{
				$group: {
					_id: {
						year: { $year: '$createdAt' },
						month: { $month: '$createdAt' },
					},
					total: { $sum: 1 },
				},
			},
			{
				$project: {
					_id: 0,
					year: '$_id.year',
					month: '$_id.month',
					total: 1,
				},
			},
		]);

		// Cek apakah data untuk bulan saat ini sudah ada
		const found = newDataCountPerMonth.find(
			(entry) =>
				entry.year === currentYear &&
				entry.month === currentMonth,
		);

		// Jika data untuk bulan saat ini belum ada, tambahkan entri baru dengan total 0
		if (!found) {
			newDataCountPerMonth.push({
				year: currentYear,
				month: currentMonth,
				total: 0,
			});
		}
		return newDataCountPerMonth;
	} catch (error) {
		throw error;
	}
};
