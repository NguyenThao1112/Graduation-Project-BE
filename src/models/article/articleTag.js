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
    getId() {return this.#id;};
    getTag() {return this.#tag;};   
    getCreatedAt() {return this.#createdAt;};
    getUpdatedAt() {return this.#updatedAt;}; 
    getIsDeleted() {return this.#isDeleted;};
    getArticles() {return this.#articles;};

    //Setters
    setId(id) {this.#id = id;};
    setTag(tag) {this.#tag = tag;};
    setCreatedAt(createdAt) {this.#createdAt = createdAt;};
    setUpdatedAt(updatedAt) {this.#updatedAt = updatedAt;}; 
    setIsDeleted(isDeleted) {this.#isDeleted = isDeleted;};
    setArticles(articles) {this.#articles = articles;};
}

module.exports = {
    ArticleTag,
}