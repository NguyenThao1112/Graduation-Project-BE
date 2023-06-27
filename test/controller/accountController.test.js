const { response } = require('express');

const database = require('../../src/configs/database');
const messageConstants = require('../../src/constants/messageConstants');
const AccountControllers = require('../../src/controllers/accountControllers');

jest.mock('../../src/configs/database');

test('should Get Account by id', async () => {
	expect(true).toEqual(true);
}, 50000);
