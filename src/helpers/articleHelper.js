import {Article} from '../models/article/article';

class ArticleBuilder {

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

    setId(id) {
        this.#id = id;
        return this;
    };    
    setName(name) {
        this.#name = name;
        return this;
    };  
    setYear(year) {
        this.#year = year;
        return this;
    };  
    setPageFrom(pageFrom) {
        this.#pageFrom = pageFrom;
        return this;
    }; 
    setPageTo(pageTo) {
        this.#paseto = pageTo;
        return this;
    };   
    setVolume(volume) {
        this.#volume = volume;
        return this;
    };    
    setIssue(issue) {
        this.#issue = issue;
        return this;
    };     
    setCity(city) {
        this.#city = city;
        return this;
    }; 
    setAbstract(abstract) {
        this.#abstract = abstract;
        return this;
    }; 
    setInstitution(institution) {
        this.#institution = institution;
        return this;
    };  
    setDepartment(department) {
        this.#department = department;
        return this;
    };    
    setType(type) {
        this.#type = type;
        return this;
    }; 
    setMonth(month) {
        this.#month = month;
        return this;
    };
    setDay(day) {
        this.#day = day;
        return this;
    };  
    setUrlAccessDate(urlAccessDate) {
        this.#urlAccessDate = urlAccessDate;
        return this;
    }; 
    setArXivID(ArXivID) {
        this.#ArXivID = ArXivID;
        return this;
    }; 
    setDOI(DOI) {
        this.#DOI = DOI;
        return this;
    };        
    setISBN(ISBN) {
        this.#ISBN = ISBN;
        return this;
    }; 
    setISSN(ISSN) {
        this.#ISSN = ISSN;
        return this;
    };       
    setPMID(PMID) {
        this.#PMID = PMID;
        return this;
    };    
    setScopus(Scopus) {
        this.#Scopus = Scopus;
        return this;
    };     
    setPII(PII) {
        this.#PII = PII;
        return this;
    };        
    setSGR(SGR) {
        this.#SGR = SGR;
        return this;
    };        
    setProjectId(projectId) {
        this.#projectId = projectId;
        return this;
    }; 
    setCitationKey(citationKey) {
        this.#citationKey = citationKey;
        return this;
    };    
    setGeneralNote(generalNote) {
        this.#generalNote = generalNote;
        return this;
    };
    setCreatedAt(createdAt) {
        this.#createdAt = createdAt;
        return this;
    };
    setUpdatedAt(updatedAt) {
        this.#updatedAt = updatedAt;
        return this;
    }; 
    setIsDeleted(isDeleted) {
        this.#isDeleted = isDeleted;
        return this;
    };
    setTags(tags) {
        this.#tags = tags;
        return this;
    };
    setAuthors(authors) {
        this.#authors = authors;
        return this;
    };
    setUrls(urls) {
        this.#urls = urls;
        return this;
    };
    setFiles(files) {
        this.#files = files;
        return this;
    };
    setNotes(notes) {
        this.#notes = notes;
        return this;
    };

    build() {
        return new Article(
            this.#id,
            this.#name,
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

module.exports = {
    ArticleBuilder,
}