const {Article} = require('../models/article/article');
const moment = require('moment');

class ArticleBuilder {

    #id;            //number
    #name;          //string
    #journal;       //string
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
    setJournal(journal) {
        this.#journal = journal;
        return this;
    }  
    setYear(year) {
        this.#year = year;
        return this;
    };  
    setPageFrom(pageFrom) {
        this.#pageFrom = pageFrom;
        return this;
    }; 
    setPageTo(pageTo) {
        this.#pageTo = pageTo;
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

    setBulk(articleObject) {
        this.#id = articleObject.id ?? null;
        this.#journal = articleObject.journal ?? null;                        
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
        this.#urlAccessDate = articleObject.urlAccessDate ? moment(articleObject.urlAccessDate, "DD/MM/YYYY").format("YYYY/MM/DD"): null;
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