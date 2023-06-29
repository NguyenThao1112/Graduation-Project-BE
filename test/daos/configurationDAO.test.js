const ConfigureDAO = require('../../src/daos/configurationDAO');

test('should Get Contact Type With Id', async () => {
	const contactTypeId = 1;
	const contactType = await ConfigureDAO.getContactTypeById(contactTypeId);
	expect(contactType[0].id).toEqual(contactTypeId);
	expect(contactType[0]).toHaveProperty('id');
	expect;
}, 30000);
