class ArticleFile {
    #id;            //string
    #path;           //string

    //meta data
    #createdAt;     //datetime
    #updatedAt;     //datetime
    #isDeleted;     //boolean

    //Association
    #article;

    //Getters
    get id() {return this.#id;};
    get path() {return this.#path;};   
    get createdAt() {return this.#createdAt;};
    get updatedAt() {return this.#updatedAt;}; 
    get isDeleted() {return this.#isDeleted;};
    get article() {return this.#article};

    //Setters
    set id(id) {this.#id = id;};
    set path(path) {this.#path = path;};
    set createdAt(createdAt) {this.#createdAt = createdAt;};
    set updatedAt(updatedAt) {this.#updatedAt = updatedAt;}; 
    set isDeleted(isDeleted) {this.#isDeleted = isDeleted;};
    set article(article) {this.#article = article;};
}

module.exports = {
    ArticleFile,
}