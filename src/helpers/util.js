const b = require('based-blob');

const base64Img = 'data:image/png;base64,';
const convertBase64ToBinary = (base64) => {
	if (!base64) return '';
	const buffer = Buffer.from(base64, 'base64');
	return buffer.toString('binary');
};

const convertBinaryToBase64 = (binary) => {
	if (!binary) return '';
	const buffer = Buffer.from(binary, 'binary');
	return buffer.toString('base64');
};

const convertBase64ToBlob = async (base64) => {
	if (!base64) return '';
	const base64Data = base64.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
	const buffer = await Buffer.from(base64Data, 'base64');
	return buffer;
};

const convertBlobToBase64 = (blobData) => {
	if (!blobData) return '';
	let base64String = Buffer.from(blobData).toString('base64');
	base64String = base64Img + base64String;
	return base64String;
};

module.exports = {
	convertBase64ToBinary,
	convertBinaryToBase64,
	convertBase64ToBlob,
	convertBlobToBase64,
};
