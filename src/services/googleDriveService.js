// @ts-nocheck
const { google } = require('googleapis');
const stream = require('stream');
const config = require('../constants/configConstants');

const {
	GOOGLE_DRIVE_CLIENT_ID,
	GOOGLE_DRIVE_CLIENT_SECRET,
	GOOGLE_DRIVE_REDIRECT_URI,
	GOOGLE_DRIVE_REFRESH_TOKEN,
	GOOGLE_DRIVE_FOLDER_ID,
} = config;

// OAuth 2.0 credentials
const credentials = {
	client_id: GOOGLE_DRIVE_CLIENT_ID,
	client_secret: GOOGLE_DRIVE_CLIENT_SECRET,
	redirect_uris: [GOOGLE_DRIVE_REDIRECT_URI],
};

// Token for authorization
const token = {
	refresh_token: GOOGLE_DRIVE_REFRESH_TOKEN,
};

const oAuth2Client = new google.auth.OAuth2(
	credentials.client_id,
	credentials.client_secret,
	credentials.redirect_uris[0]
);
oAuth2Client.setCredentials(token);

// Constants for file upload
const folderId = GOOGLE_DRIVE_FOLDER_ID; // ID of the folder in Google Drive to upload the file to

// Utility function to create a readable stream from buffer
function createReadStreamFromBuffer(buffer) {
	const readable = new stream.Readable();
	readable._read = () => {};
	readable.push(buffer);
	readable.push(null);
	return readable;
}

async function uploadFile(file) {
	const drive = google.drive({ version: 'v3', auth: oAuth2Client });

	const fileMetadata = {
		name: file.name,
		parents: [folderId], // Upload the file to the specified folder
	};

	const media = {
		mimeType: file.mimeType,
		body: createReadStreamFromBuffer(file.data),
	};

	try {
		const response = await drive.files.create({
			resource: fileMetadata,
			media: media,
			fields: 'id, webViewLink', // Request the web view link in the response
		});

		return response.data.webViewLink;
	} catch (error) {
		console.error('Error uploading file:', error.message);
		throw error;
	}
}

// Handle the request to upload the file
function handleFileUpload(file) {
	return new Promise((resolve, reject) => {
		if (!file) {
			reject(new Error('No file uploaded.'));
			return;
		}

		uploadFile(file)
			.then((fileId) => resolve(fileId))
			.catch((error) => reject(error));
	});
}

module.exports = { handleFileUpload };
