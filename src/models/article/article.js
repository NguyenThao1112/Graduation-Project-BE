class Article {

    #id;            //number
    #name;          //string
    #year;          //number
    #pageFrom;      //number
    #pageTo;        //number
    #volume;        //number
    #issue;         //number
    #city;          //string
    #abstract;      //string
    
    //Thesis stuff
    #institution;   //string
    #department;    //string
    #type;          //string
    #month;         //number
    #day;           //number

    #urlAccessDate; //date

    //Identitifiers
    #ArXivID;       //string
    #DOI;           //string
    #ISBN;          //string
    #ISSN;          //string
    #PMID;          //string
    #Scopus;        //string
    #PII;           //string
    #SGR;           //string

    #projectId;     //string
    #citationKey;   //string
    #generalNote;   //string

    //meta data
    #createdAt;     //datetime
    #updatedAt;     //datetime
    #isDeleted;     //boolean

    //Associations
    #tags;          //Array<Tag>
    #authors;       //Array<Author>
    #urls;          //Array<ArticleUrl>
    #files;         //Array<ArticleFile>
    #notes;         //Array<ArticleNote>

    constructor(
        id,
        name,
        year,
        pageFrom,
        pageTo,
        volume,
        issue,
        city,
        abstract,
        institution,
        department,
        type,
        month,
        day,
        urlAccessDate,
        ArXivID,
        DOI,
        ISBN,
        ISSN,
        PMID,
        Scopus,
        PII,
        SGR,
        projectId,
        citationKey,
        generalNote,
        createdAt,
        updatedAt,
        isDeleted,
        tags,
        authors,
        urls,
        files,
        notes
    ) { 
        this.#id = id;
        this.#name = name;
        this.#year = year;
        this.#pageFrom = pageFrom;
        this.#pageTo = pageTo;
        this.#volume = volume;
        this.#issue = issue;
        this.#city = city;
        this.#abstract = abstract;
        this.#institution = institution;
        this.#department = department;
        this.#type = type;
        this.#month = month;
        this.#day = day;
        this.#urlAccessDate = urlAccessDate;
        this.#ArXivID = ArXivID;
        this.#DOI = DOI;
        this.#ISBN = ISBN;
        this.#ISSN = ISSN;
        this.#PMID = PMID;
        this.#Scopus = Scopus;
        this.#PII = PII;
        this.#SGR = SGR;
        this.#projectId = projectId;
        this.#citationKey = citationKey;
        this.#generalNote = generalNote;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
        this.#isDeleted = isDeleted;
        this.#tags = tags;
        this.#authors = authors;
        this.#urls = urls;
        this.#files = files;
        this.#notes = notes;
    }

    //Getters
    get id() {return this.#id;};    
    get name() {return this.#name;};  
    get year() {return this.#year;};  
    get pageFrom() {return this.#pageFrom;}; 
    get pageTo() {return this.#pageTo;};   
    get volume() {return this.#volume;};    
    get issue() {return this.#issue;};     
    get city() {return this.#city;}; 
    get abstract() {return this.#abstract;}; 
    get institution() {return this.#institution;};  
    get department() {return this.#department;};    
    get type() {return this.#type;}; 
    get month() {return this.#month;};
    get day() {return this.#day;};  
    get urlAccessDate() {return this.#urlAccessDate;}; 
    get arXivID() {return this.#ArXivID;}; 
    get dOI() {return this.#DOI;};        
    get iSBN() {return this.#ISBN;}; 
    get iSSN() {return this.#ISSN;};       
    get pMID() {return this.#PMID;};    
    get scopus() {return this.#Scopus;};     
    get pII() {return this.#PII;};        
    get sGR() {return this.#SGR;};        
    get projectId() {return this.#projectId;}; 
    get citationKey() {return this.#citationKey;};    
    get generalNote() {return this.#generalNote;};
    get createdAt() {return this.#createdAt;};
    get updatedAt() {return this.#updatedAt;}; 
    get isDeleted() {return this.#isDeleted;};
    get tags() {return this.#tags;};
    get authors() {return this.#authors;};
    get urls() {return this.#urls;};
    get files() {return this.#files;};
    get notes() {return this.#notes;};

    //Setters
    set id(id) {this.#id = id;};    
    set name(name) {this.#name = name;};  
    set year(year) {this.#year = year;};  
    set pageFrom(pageFrom) {this.#pageFrom = pageFrom;}; 
    set pageTo(pageTo) {this.#pageTo = pageTo;};   
    set volume(volume) {this.#volume = volume;};    
    set issue(issue) {this.#issue = issue;};     
    set city(city) {this.#city = city;}; 
    set abstract(abstract) {this.#abstract = abstract;}; 
    set institution(institution) {this.#institution = institution;};  
    set department(department) {this.#department = department;};    
    set type(type) {this.#type = type;}; 
    set month(month) {this.#month = month;};
    set day(day) {this.#day = day;};  
    set urlAccessDate(urlAccessDate) {this.#urlAccessDate = urlAccessDate;}; 
    set arXivID(ArXivID) {this.#ArXivID = ArXivID;}; 
    set dOI(DOI) {this.#DOI = DOI;};        
    set iSBN(ISBN) {this.#ISBN = ISBN;}; 
    set iSSN(ISSN) {this.#ISSN = ISSN;};       
    set pMID(PMID) {this.#PMID = PMID;};    
    set scopus(Scopus) {this.#Scopus = Scopus;};     
    set pII(PII) {this.#PII = PII;};        
    set sGR(SGR) {this.#SGR = SGR;};        
    set projectId(projectId) {this.#projectId = projectId;}; 
    set citationKey(citationKey) {this.#citationKey = citationKey;};    
    set generalNote(generalNote) {this.#generalNote = generalNote;};
    set createdAt(createdAt) {this.#createdAt = createdAt;};
    set updatedAt(updatedAt) {this.#updatedAt = updatedAt;}; 
    set isDeleted(isDeleted) {this.#isDeleted = isDeleted;};
    set tags(tags) {this.#tags = tags;};
    set authors(authors) {this.#authors = authors;};
    set urls(urls) {this.#urls = urls;};
    set files(files) {this.#files = files;};
    set notes(notes) {this.#notes = notes;};
}

module.exports = {
    Article,
}

