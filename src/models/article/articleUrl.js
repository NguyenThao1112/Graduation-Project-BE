class ArticleUrl {
    #id;            //string
    #url;           //string

    //meta data
    #createdAt;     //datetime
    #updatedAt;     //datetime
    #isDeleted;     //boolean

    //Getters
    getId() {return this.#id;};
    getUrl() {return this.#url;};   
    getCreatedAt() {return this.#createdAt;};
    getUpdatedAt() {return this.#updatedAt;}; 
    getIsDeleted() {return this.#isDeleted;};

    //Setters
    setId(id) {this.#id = id;};
    setUrl(url) {this.#url = url;};
    setCreatedAt(createdAt) {this.#createdAt = createdAt;};
    setUpdatedAt(updatedAt) {this.#updatedAt = updatedAt;}; 
    setIsDeleted(isDeleted) {this.#isDeleted = isDeleted;};
}

module.exports = {
    ArticleUrl,
}