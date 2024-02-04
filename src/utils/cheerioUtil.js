import * as cheerio from 'cheerio';

export const extractImageUrls = (contentHtml) => {
	const $ = cheerio.load(contentHtml);
	const imageUrls = [];

	// Cari semua elemen <img> dalam konten HTML
	const imgElements = $('img');
	if (imgElements.length > 0) {
		imgElements.each((index, element) => {
			const src = $(element).attr('src');
			if (src) {
				imageUrls.push(src);
			}
		});
		return imageUrls;
	}
};
