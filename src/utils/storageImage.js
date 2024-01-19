import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebase.js';
import {
	getStorage,
	ref,
	getDownloadURL,
	uploadBytesResumable,
	deleteObject,
} from 'firebase/storage';
import { giveCurrentDateTime } from './getTimes.js';

initializeApp(firebaseConfig);
const storage = getStorage();

export const sendImage = async ({
	folderName,
	originalName,
	mimeType,
	fileBuffer,
}) => {
	try {
		const { dateTime } = giveCurrentDateTime();
		const newName = `${folderName}/${originalName}_${dateTime}`;
		const storageRef = ref(storage, newName);

		// Create file metadata including the content type
		const metaData = {
			contentType: mimeType,
		};

		// Upload the file to the bucket storage
		const snapshot = await uploadBytesResumable(
			storageRef,
			fileBuffer,
			metaData,
		);

		// Get the public URL
		const downloadURL = await getDownloadURL(snapshot.ref);

		return downloadURL;
	} catch (error) {
		throw error;
	}
};

export const deleteImage = async (imageURL) => {
	try {
		const oldThumbnailRef = ref(storage, imageURL);
		await deleteObject(oldThumbnailRef);
	} catch (error) {
		throw error;
	}
};
