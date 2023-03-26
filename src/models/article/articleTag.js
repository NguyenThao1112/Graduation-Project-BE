class ArticleTag {
    #id;            //string
    #tag;           //string

    //meta data
    #createdAt;     //datetime
    #updatedAt;     //datetime
    #isDeleted;     //boolean

    //association
    #articles;      //Array<Article>

    //Getters
    get id() {return this.#id;};
    get tag() {return this.#tag;};   
    get createdAt() {return this.#createdAt;};
    get updatedAt() {return this.#updatedAt;}; 
    get isDeleted() {return this.#isDeleted;};
    get articles() {return this.#articles;};

    //Setters
    set id(id) {this.#id = id;};
    set tag(tag) {this.#tag = tag;};
    set createdAt(createdAt) {this.#createdAt = createdAt;};
    set updatedAt(updatedAt) {this.#updatedAt = updatedAt;}; 
    set isDeleted(isDeleted) {this.#isDeleted = isDeleted;};
    set articles(articles) {this.#articles = articles;};
}

module.exports = {
    ArticleTag,
}