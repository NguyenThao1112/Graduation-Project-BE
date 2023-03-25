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

    //Getters
    getId() {return this.#id;};    
    getName() {return this.#name;};  
    getYear() {return this.#year;};  
    getPageFrom() {return this.#pageFrom;}; 
    getPageTo() {return this.#pageTo;};   
    getVolume() {return this.#volume;};    
    getIssue() {return this.#issue;};     
    getCity() {return this.#city;}; 
    getAbstract() {return this.#abstract;}; 
    getInstitution() {return this.#institution;};  
    getDepartment() {return this.#department;};    
    getType() {return this.#type;}; 
    getMonth() {return this.#month;};
    getDay() {return this.#day;};  
    getUrlAccessDate() {return this.#urlAccessDate;}; 
    getArXivID() {return this.#ArXivID;}; 
    getDOI() {return this.#DOI;};        
    getISBN() {return this.#ISBN;}; 
    getISSN() {return this.#ISSN;};       
    getPMID() {return this.#PMID;};    
    getScopus() {return this.#Scopus;};     
    getPII() {return this.#PII;};        
    getSGR() {return this.#SGR;};        
    getProjectId() {return this.#projectId;}; 
    getCitationKey() {return this.#citationKey;};    
    getGeneralNote() {return this.#generalNote;};
    getCreatedAt() {return this.#createdAt;};
    getUpdatedAt() {return this.#updatedAt;}; 
    getIsDeleted() {return this.#isDeleted;};
    getTags() {return this.#tags;};
    getAuthors() {return this.#authors;};
    getUrls() {return this.#urls;};
    getFiles() {return this.#files;};
    getNotes() {return this.#notes;};

    //Setters
    setId(id) {this.#id = id;};    
    setName(name) {this.#name = name;};  
    setYear(year) {this.#year = year;};  
    setPageFrom(pageFrom) {this.#pageFrom = pageFrom;}; 
    setPaseto(pageTo) {this.#paseto = pageTo;};   
    setVolume(volume) {this.#volume = volume;};    
    setIssue(issue) {this.#issue = issue;};     
    setCity(city) {this.#city = city;}; 
    setAbstract(abstract) {this.#abstract = abstract;}; 
    setInstitution(institution) {this.#institution = institution;};  
    setDepartment(department) {this.#department = department;};    
    setType(type) {this.#type = type;}; 
    setMonth(month) {this.#month = month;};
    setDay(day) {this.#day = day;};  
    setUrlAccessDate(urlAccessDate) {this.#urlAccessDate = urlAccessDate;}; 
    setArXivID(ArXivID) {this.#ArXivID = ArXivID;}; 
    setDOI(DOI) {this.#DOI = DOI;};        
    setISBN(ISBN) {this.#ISBN = ISBN;}; 
    setISSN(ISSN) {this.#ISSN = ISSN;};       
    setPMID(PMID) {this.#PMID = PMID;};    
    setScopus(Scopus) {this.#Scopus = Scopus;};     
    setPII(PII) {this.#PII = PII;};        
    setSGR(SGR) {this.#SGR = SGR;};        
    setProjectId(projectId) {this.#projectId = projectId;}; 
    setCitationKey(citationKey) {this.#citationKey = citationKey;};    
    setGeneralNote(generalNote) {this.#generalNote = generalNote;};
    setCreatedAt(createdAt) {this.#createdAt = createdAt;};
    setUpdatedAt(updatedAt) {this.#updatedAt = updatedAt;}; 
    setIsDeleted(isDeleted) {this.#isDeleted = isDeleted;};
    setTags(tags) {this.#tags = tags;};
    setAuthors(authors) {this.#authors = authors;};
    setUrls(urls) {this.#urls = urls;};
    setFiles(files) {this.#files = files;};
    setNotes(notes) {this.#notes = notes;};
}

module.exports = {
    Article,
}

