const connection = require('../configs/database');
const { getCurrentTimeFormat } = require('../helpers/timeHelper');
/**
 *  Query to delete multiple record in a certain table at the same time
 *
 * @param {string} tableName
 * @param {Array<number>} deletedIds
 * @return {Promise}
 */
function deleteRecordInTable(tableName, deletedIds) {
	return new Promise(function (resolve, reject) {
		if (!(deletedIds.length > 0)) {
			resolve(null);
			return;
		}
		const query = [
			`UPDATE ${tableName}`,
			'SET is_deleted = ?, updated_at = ?',
			'WHERE id IN (?)',
		].join(' ');

		const now = getCurrentTimeFormat();
		const isDeleted = true;

		//Using bulk update for better performance
		connection.query(query, [isDeleted, now, deletedIds], (error, result) => {
			if (error) {
				reject(error);
				return;
			}

			//Number of records are deleted
			const size = result.affectedRows;
			resolve(size);
		});
	});
}

/**
 *  Query to delete file belong to lecturer
 *
 * @return {Promise}
 */
function deleteFile(fileId, lecturerId) {
	return new Promise(function (resolve, reject) {
		const query = [
			`UPDATE lecturer_file`,
			'SET is_deleted = ?, updated_at = ?',
			'WHERE id = ? AND lecturer_id = ?',
		].join(' ');

		const now = getCurrentTimeFormat();
		const isDeleted = true;

		//Using bulk update for better performance
		connection.query(
			query,
			[isDeleted, now, fileId, lecturerId],
			(error, result) => {
				if (error) {
					reject(error);
					return;
				}

				//Number of records are deleted
				const size = result.affectedRows;
				resolve(size);
			}
		);
	});
}

module.exports = {
	deleteRecordInTable,
	deleteFile,
};
