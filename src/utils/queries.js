export const buildSearchQuery = (req, fields) => {
	const searchQuery = req.query.search || '';
	const filterPrice = req.query.price || 0;
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

	const category = req.query.category;
	if (category && category !== 'all') {
		filters.category = { $in: category };
	}

	if (filterPrice) {
		const priceRange = filterPrice.split('-');
		if (priceRange.length === 2) {
			const minPrice = parseFloat(priceRange[0]);
			const maxPrice = parseFloat(priceRange[1]);
			if (!isNaN(minPrice) && !isNaN(maxPrice)) {
				filters.price = {
					$gte: minPrice,
					$lte: maxPrice,
				};
			}
		} else {
			const priceValue = parseFloat(filterPrice);
			if (!isNaN(priceValue)) {
				filters.price = priceValue;
			}
		}
	}

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
