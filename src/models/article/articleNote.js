class ArticleNote {
    #id;            //string
    #note;          //string

    //meta data
    #createdAt;     //datetime
    #updatedAt;     //datetime
    #isDeleted;     //boolean

    //Getters
    get id() {return this.#id;};
    get note() {return this.#note;};   
    get createdAt() {return this.#createdAt;};
    get updatedAt() {return this.#updatedAt;}; 
    get isDeleted() {return this.#isDeleted;};

    //Setters
    set id(id) {this.#id = id;};
    set note(note) {this.#note = note;};
    set createdAt(createdAt) {this.#createdAt = createdAt;};
    set updatedAt(updatedAt) {this.#updatedAt = updatedAt;}; 
    set isDeleted(isDeleted) {this.#isDeleted = isDeleted;};
}

module.exports = {
    ArticleNote,
}