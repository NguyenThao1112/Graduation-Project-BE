class ArticleNote {
    #id;            //string
    #note;          //string

    //meta data
    #createdAt;     //datetime
    #updatedAt;     //datetime
    #isDeleted;     //boolean

    //Getters
    getId() {return this.#id;};
    getNote() {return this.#note;};   
    getCreatedAt() {return this.#createdAt;};
    getUpdatedAt() {return this.#updatedAt;}; 
    getIsDeleted() {return this.#isDeleted;};

    //Setters
    setId(id) {this.#id = id;};
    setNote(note) {this.#note = note;};
    setCreatedAt(createdAt) {this.#createdAt = createdAt;};
    setUpdatedAt(updatedAt) {this.#updatedAt = updatedAt;}; 
    setIsDeleted(isDeleted) {this.#isDeleted = isDeleted;};
}

module.exports = {
    ArticleNote,
}