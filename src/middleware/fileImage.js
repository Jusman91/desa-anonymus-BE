import {
	deleteImage,
	sendImage,
} from '../utils/storageImage.js';

export const uploadFileImage = async ({
	req,
	res,
	next,
	folderName,
}) => {
	try {
		const originalName = req.file.originalname;
		const mimeType = req.file.mimetype;
		const fileBuffer = req.file.buffer;

		const downloadURL = await sendImage({
			folderName,
			originalName,
			mimeType,
			fileBuffer,
		});
		res.status(201).json(downloadURL);
	} catch (error) {
		next(error);
	}
};

export const updateFileImage = async ({
	req,
	res,
	next,
	folderName,
	oldDataImgURL,
}) => {
	try {
		const originalName = req.file.originalname;
		const mimeType = req.file.mimetype;
		const fileBuffer = req.file.buffer;

		if (oldDataImgURL) {
			deleteImage(oldDataImgURL);
		}

		const downloadURL = await sendImage({
			folderName,
			originalName,
			mimeType,
			fileBuffer,
		});
		res.status(201).json(downloadURL);
	} catch (error) {
		next(error);
	}
};
