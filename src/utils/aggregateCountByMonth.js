import {
	getCurrentDateCreateGte,
	getCurrentDateCreateLt,
} from './getTimes.js';

export const aggregateCountByMonth = async (model) => {
	const startDate = getCurrentDateCreateGte();
	const endDate = getCurrentDateCreateLt();
	try {
		const newDataCountPerMonth = await model.aggregate([
			{
				$match: {
					createdAt: {
						$gte: startDate,
						$lte: endDate,
					},
				},
			},
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
		return newDataCountPerMonth;
	} catch (error) {
		throw error;
	}
};
