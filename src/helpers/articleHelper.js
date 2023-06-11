const { Article } = require('../models/article/article');
const moment = require('moment');

class ArticleBuilder {
	#id; //number
	#name; //string
	#journal; //string
	#conference; //string
	#rank; //string
	#year; //number
	#pageFrom; //number
	#pageTo; //number
	#volume; //number
	#issue; //number
	#city; //string
	#abstract; //string

	//Thesis stuff
	#institution; //string
	#department; //string
	#type; //string
	#month; //number
	#day; //number

	#urlAccessDate; //date

	//Identitifiers
	#ArXivID; //string
	#DOI; //string
	#ISBN; //string
	#ISSN; //string
	#PMID; //string
	#Scopus; //string
	#PII; //string
	#SGR; //string

	#projectId; //string
	#citationKey; //string
	#generalNote; //string

	//meta data
	#createdAt; //datetime
	#updatedAt; //datetime
	#isDeleted; //boolean

	//Associations
	#tags; //Array<Tag>
	#authors; //Array<Author>
	#urls; //Array<ArticleUrl>
	#files; //Array<ArticleFile>
	#notes; //Array<ArticleNote>

	setId(id) {
		this.#id = id;
		return this;
	}
	setName(name) {
		this.#name = name;
		return this;
	}
	setJournal(journal) {
		this.#journal = journal;
		return this;
	}
	setConference(conference) {
		this.#conference = conference;
		return this;
	}
	setRank(rank) {
		this.#rank = rank;
		return this;
	}
	setYear(year) {
		this.#year = year;
		return this;
	}
	setPageFrom(pageFrom) {
		this.#pageFrom = pageFrom;
		return this;
	}
	setPageTo(pageTo) {
		this.#pageTo = pageTo;
		return this;
	}
	setVolume(volume) {
		this.#volume = volume;
		return this;
	}
	setIssue(issue) {
		this.#issue = issue;
		return this;
	}
	setCity(city) {
		this.#city = city;
		return this;
	}
	setAbstract(abstract) {
		this.#abstract = abstract;
		return this;
	}
	setInstitution(institution) {
		this.#institution = institution;
		return this;
	}
	setDepartment(department) {
		this.#department = department;
		return this;
	}
	setType(type) {
		this.#type = type;
		return this;
	}
	setMonth(month) {
		this.#month = month;
		return this;
	}
	setDay(day) {
		this.#day = day;
		return this;
	}
	setUrlAccessDate(urlAccessDate) {
		this.#urlAccessDate = urlAccessDate;
		return this;
	}
	setArXivID(ArXivID) {
		this.#ArXivID = ArXivID;
		return this;
	}
	setDOI(DOI) {
		this.#DOI = DOI;
		return this;
	}
	setISBN(ISBN) {
		this.#ISBN = ISBN;
		return this;
	}
	setISSN(ISSN) {
		this.#ISSN = ISSN;
		return this;
	}
	setPMID(PMID) {
		this.#PMID = PMID;
		return this;
	}
	setScopus(Scopus) {
		this.#Scopus = Scopus;
		return this;
	}
	setPII(PII) {
		this.#PII = PII;
		return this;
	}
	setSGR(SGR) {
		this.#SGR = SGR;
		return this;
	}
	setProjectId(projectId) {
		this.#projectId = projectId;
		return this;
	}
	setCitationKey(citationKey) {
		this.#citationKey = citationKey;
		return this;
	}
	setGeneralNote(generalNote) {
		this.#generalNote = generalNote;
		return this;
	}
	setCreatedAt(createdAt) {
		this.#createdAt = createdAt;
		return this;
	}
	setUpdatedAt(updatedAt) {
		this.#updatedAt = updatedAt;
		return this;
	}
	setIsDeleted(isDeleted) {
		this.#isDeleted = isDeleted;
		return this;
	}
	setTags(tags) {
		this.#tags = tags;
		return this;
	}
	setAuthors(authors) {
		this.#authors = authors;
		return this;
	}
	setUrls(urls) {
		this.#urls = urls;
		return this;
	}
	setFiles(files) {
		this.#files = files;
		return this;
	}
	setNotes(notes) {
		this.#notes = notes;
		return this;
	}

	setBulk(articleObject) {
		this.#id = articleObject.id ?? null;
		this.#journal = articleObject.journal ?? null;
		this.#conference = articleObject.conference ?? null;
		this.#rank = articleObject.rank ?? null;
		this.#name = articleObject.name ?? null;
		this.#year = articleObject.year ?? null;
		this.#pageFrom = articleObject.pageFrom ?? null;
		this.#pageTo = articleObject.pageTo ?? null;
		this.#volume = articleObject.volume ?? null;
		this.#issue = articleObject.issue ?? null;
		this.#city = articleObject.city ?? null;
		this.#abstract = articleObject.abstract ?? null;
		this.#institution = articleObject.institution ?? null;
		this.#department = articleObject.department ?? null;
		this.#type = articleObject.type ?? null;
		this.#month = articleObject.month ?? null;
		this.#day = articleObject.day ?? null;
		this.#urlAccessDate = articleObject.urlAccessDate
			? moment(articleObject.urlAccessDate, 'DD/MM/YYYY').format('YYYY/MM/DD')
			: null;
		this.#ArXivID = articleObject.ArXivID ?? null;
		this.#DOI = articleObject.DOI ?? null;
		this.#ISBN = articleObject.ISBN ?? null;
		this.#ISSN = articleObject.ISSN ?? null;
		this.#PMID = articleObject.PMID ?? null;
		this.#Scopus = articleObject.Scopus ?? null;
		this.#PII = articleObject.PII ?? null;
		this.#SGR = articleObject.SGR ?? null;
		this.#projectId = articleObject.projectId ?? null;
		this.#citationKey = articleObject.citationKey ?? null;
		this.#generalNote = articleObject.generalNote ?? null;
		this.#createdAt = articleObject.createdAt ?? null;
		this.#updatedAt = articleObject.updatedAt ?? null;
		this.#isDeleted = articleObject.isDeleted ?? null;
		this.#tags = articleObject.tags ?? null;
		this.#authors = articleObject.authors ?? null;
		this.#urls = articleObject.urls ?? null;
		this.#files = articleObject.files ?? null;
		this.#notes = articleObject.notes ?? null;
	}

	reset() {
		this.#id = null;
		this.#name = null;
		this.#journal = null;
		this.#conference= null;
		this.#rank = null;
		this.#year = null;
		this.#pageFrom = null;
		this.#pageTo = null;
		this.#volume = null;
		this.#issue = null;
		this.#city = null;
		this.#abstract = null;
		this.#institution = null;
		this.#department = null;
		this.#type = null;
		this.#month = null;
		this.#day = null;
		this.#urlAccessDate = null;
		this.#ArXivID = null;
		this.#DOI = null;
		this.#ISBN = null;
		this.#ISSN = null;
		this.#PMID = null;
		this.#Scopus = null;
		this.#PII = null;
		this.#SGR = null;
		this.#projectId = null;
		this.#citationKey = null;
		this.#generalNote = null;
		this.#createdAt = null;
		this.#updatedAt = null;
		this.#isDeleted = null;
		this.#tags = null;
		this.#authors = null;
		this.#urls = null;
		this.#files = null;
		this.#notes = null;
	}

	build() {
		return new Article(
			this.#id,
			this.#name,
			this.#journal,
			this.#conference,
			this.#rank,
			this.#year,
			this.#pageFrom,
			this.#pageTo,
			this.#volume,
			this.#issue,
			this.#city,
			this.#abstract,
			this.#institution,
			this.#department,
			this.#type,
			this.#month,
			this.#day,
			this.#urlAccessDate,
			this.#ArXivID,
			this.#DOI,
			this.#ISBN,
			this.#ISSN,
			this.#PMID,
			this.#Scopus,
			this.#PII,
			this.#SGR,
			this.#projectId,
			this.#citationKey,
			this.#generalNote,
			this.#createdAt,
			this.#updatedAt,
			this.#isDeleted,
			this.#tags,
			this.#authors,
			this.#urls,
			this.#files,
			this.#notes
		);
	}
}

function mapArticleIdToDetailArticleData(articleId, map, mapValue) {
	if (!map.has(articleId)) {
		map.set(articleId, []);
	}
	map.get(articleId).push(mapValue);
}

function parseArticlePaginationQueryResultToResponseData(
	articleData,
	detailArticleData,
	options = null
) {
	const articles = [];

	//Parse Article's Url data to map
	const urlMap = new Map();
	detailArticleData[0].forEach((url) => {
		const articleId = url.article_id;
		const mapValue = {
			id: url.id,
			url: url.url,
		};
		mapArticleIdToDetailArticleData(articleId, urlMap, mapValue);
	});

	//Parse Article's Note data to map
	const noteMap = new Map();
	detailArticleData[1].forEach((note) => {
		const articleId = note.article_id;
		const mapValue = {
			id: note.id,
			note: note.note,
		};
		mapArticleIdToDetailArticleData(articleId, noteMap, mapValue);
	});

	//Parse Article's File data to map
	const fileMap = new Map();
	detailArticleData[2].forEach((file) => {
		const articleId = file.article_id;
		const mapValue = {
			id: file.id,
			path: file.file_path,
			original_file_name: file.original_file_name,
		};
		mapArticleIdToDetailArticleData(articleId, fileMap, mapValue);
	});

	const authorMap = new Map();
	detailArticleData[3].forEach((author) => {
		const articleId = author.article_id;
		const mapValue = {
			id: author.id,
			lecturer_id: author.lecturer_id ?? undefined,
			lecturer_name: author.lecturer_id ? author.name : undefined,
			firstName: author.first_name ?? undefined,
			lastName: author.last_name ?? undefined,
		};
		mapArticleIdToDetailArticleData(articleId, authorMap, mapValue);
	});

	const categoryMap = new Map();
	detailArticleData[4].forEach((category) => {
		const articleId = category.article_id;
		const mapValue = {
			id: category.id,
			tag_id: category.tag_id,
			name: category.name,
		};
		mapArticleIdToDetailArticleData(articleId, categoryMap, mapValue);
	});

	articleData.forEach((article) => {

		const articleDto = {
			id: article.id,
			name: article.name,
			journal: article.journal,
			conference: article.conference,
			rank: article.rank,
			year: article.year,
			page_from: article.pageFrom,
			page_to: article.pageTo,
			volume: article.volume,
			issue: article.issue,
			city: article.city,
			abstract: article.abstract,
			url_date_accces: article.urlAccessDate,
			ArXivID: article.ArXivID,
			DOI: article.DOI,
			ISBN: article.ISBN,
			ISSN: article.ISSN,
			PMID: article.PMID,
			Scopus: article.Scopus,
			PII: article.PII,
			SGR: article.SGR,
			project_id: article.projectId,
			citation_key: article.citationKey,
			general_note: article.generalNote,

			urls: urlMap.get(article.id),
			files: fileMap.get(article.id),
			notes: noteMap.get(article.id),
			tags: categoryMap.get(article.id),
			authors: authorMap.get(article.id),
		}

		if (null !== options && options.hasOwnProperty('lecturerIds') && (undefined !== options.lecturerIds)) {
			articleDto.lecturer_id = article.lecturer_id;
		}


		articles.push(articleDto);
	});

	return articles;
}

module.exports = {
	ArticleBuilder,
	parseArticlePaginationQueryResultToResponseData,
};
