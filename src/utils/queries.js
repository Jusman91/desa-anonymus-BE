export const buildSearchQuery = (searchQuery, fields) => {
	// const searchQuery = req.query.search || '';
	const filters = {};
	const filterConditions = searchQuery.split(',');

	filterConditions.forEach((condition) => {
		const [key, value] = condition.split(':');
		if (key && value) {
			filters[key.trim()] = {
				$regex: value.trim(),
				$options: 'i',
			};
		}
	});

	return Object.keys(filters).length > 0
		? filters
		: {
				$or: fields.map((field) => ({
					[field]: { $regex: searchQuery, $options: 'i' },
				})),
		  };
};

export const buildSortQuery = (req) => {
	const sortQuery = req.query.sort || 'createdAt_desc';
	const sortConditions = sortQuery.split(',');
	let sortBy = {};

	sortConditions.forEach((condition) => {
		const [key, order] = condition.split('_');
		if (key && order) {
			const sortOrder = order === 'asc' ? 1 : -1;
			sortBy[key] = sortOrder;
		}
	});

	return sortBy;
};

export const buildPagination = (req) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 5;
	const skip = (page - 1) * limit;

	return { page, limit, skip };
};
