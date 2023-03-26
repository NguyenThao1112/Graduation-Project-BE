class ArticleUrl {
    #id;            //string
    #url;           //string

    //meta data
    #createdAt;     //datetime
    #updatedAt;     //datetime
    #isDeleted;     //boolean

    //Getters
    get id() {return this.#id;};
    get url() {return this.#url;};   
    get createdAt() {return this.#createdAt;};
    get updatedAt() {return this.#updatedAt;}; 
    get isDeleted() {return this.#isDeleted;};

    //Setters
    set id(id) {this.#id = id;};
    set url(url) {this.#url = url;};
    set createdAt(createdAt) {this.#createdAt = createdAt;};
    set updatedAt(updatedAt) {this.#updatedAt = updatedAt;}; 
    set isDeleted(isDeleted) {this.#isDeleted = isDeleted;};
}

module.exports = {
    ArticleUrl,
}