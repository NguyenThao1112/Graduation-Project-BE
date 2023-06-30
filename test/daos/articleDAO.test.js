const AccountDAO = require('../../src/daos/accountDAO');
const searchArticleDAO = require('../../src/daos/articleDAOs/searchArticleDAO');

test('should get article url when pass article Id ', async () => {
	const articleIds = [1];
	const articleData =
		await searchArticleDAO.getDataOfSubtableJoningWithArticleByArticleId(
			'article_url',
			['id', 'article_id', 'url'],
			articleIds
		);
	expect(articleData.length).toBeGreaterThan(0);
});

test('should get empty article note when pass improperly article Id ', async () => {
	const articleIds = [2];
	const articleData =
		await searchArticleDAO.getDataOfSubtableJoningWithArticleByArticleId(
			'article_note',
			['id', 'article_id', 'note'],
			articleIds
		);
	expect(articleData.length).toEqual(0);
});

test('should get article note when pass article Id ', async () => {
	const articleIds = [1];
	const articleData =
		await searchArticleDAO.getDataOfSubtableJoningWithArticleByArticleId(
			'article_note',
			['id', 'article_id', 'note'],
			articleIds
		);
	expect(articleData.length).toBeGreaterThan(0);
});

test('should get empty article note when pass article Id improperly', async () => {
	const articleIds = [3];
	const articleData =
		await searchArticleDAO.getDataOfSubtableJoningWithArticleByArticleId(
			'article_note',
			['id', 'article_id', 'note'],
			articleIds
		);
	expect(articleData.length).toEqual(0);
});

test('should get author not when pass article Id', async () => {
	const articleIds = [1];
	const articleData =
		await searchArticleDAO.getDataOfSubtableJoningWithArticleByArticleId(
			'author',
			[
				'author.id as id',
				'author.article_id as article_id',
				'author.first_name as first_name',
				'author.last_name as last_name',
				'author.lecturer_id as lecturer_id',
				'lecturer_information.name as name',
			],
			articleIds
		);
	expect(articleData.length).toBeGreaterThan(0);
});

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
