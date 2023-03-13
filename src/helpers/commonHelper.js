function convertRowsDataToArray(data) {
	return Object.values(JSON.parse(JSON.stringify(data)));
}

module.exports = {
	convertRowsDataToArray,
};
