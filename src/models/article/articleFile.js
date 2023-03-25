class ArticleFile {
    #id;            //string
    #path;           //string

    //meta data
    #createdAt;     //datetime
    #updatedAt;     //datetime
    #isDeleted;     //boolean

    //Getters
    getId() {return this.#id;};
    getPath() {return this.#path;};   
    getCreatedAt() {return this.#createdAt;};
    getUpdatedAt() {return this.#updatedAt;}; 
    getIsDeleted() {return this.#isDeleted;};

    //Setters
    setId(id) {this.#id = id;};
    setPath(path) {this.#path = path;};
    setCreatedAt(createdAt) {this.#createdAt = createdAt;};
    setUpdatedAt(updatedAt) {this.#updatedAt = updatedAt;}; 
    setIsDeleted(isDeleted) {this.#isDeleted = isDeleted;};
}

module.exports = {
    ArticleFile,
}