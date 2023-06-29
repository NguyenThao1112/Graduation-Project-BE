const AccountDAO = require('../../src/daos/accountDAO');

test('should Get Account by id', async () => {
	const accountId = 1;
	const account = await AccountDAO.getAccountById(accountId);
	expect(account[0].id).toEqual(accountId);
	expect(account[0]).toHaveProperty('id');
	expect;
}, 30000);

test('should get empty array if not found id', async () => {
	const accountId = 0;
	const account = await AccountDAO.getAccountById(accountId);
	expect(account.length).toEqual(0);
});

test('should get empty array if not found token ', async () => {
	const token = 'token';
	const account = await AccountDAO.getAccountByToken(token);
	expect(account.length).toEqual(0);
});

test('should return new account after creating', async () => {
	const account = {
		email: 'admin1@gmail.com',
		password: 'Phambinh3107@',
		role: 0,
	};

	const accountDao = await AccountDAO.createAccount(account);
	expect(accountDao.affectedRows).toEqual(1);
	expect(accountDao).toBeDefined();
});
