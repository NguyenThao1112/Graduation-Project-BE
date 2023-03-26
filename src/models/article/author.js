class Author {
    #id;            //string
    #firstName;     //string
    #lastName;      //string
    #lecturer;      //Lecturer  
    #article;       //Article

    //meta data
    #createdAt;     //datetime
    #updatedAt;     //datetime
    #isDeleted;     //boolean

    //Getters
    get id() {return this.#id;}; 
    get firstName() {return this.#firstName;};
    get lastName() {return this.#lastName;};
    get lecturer() {return this.#lecturer;}; 
    get article() {return this.#article;};
    get createdAt() {return this.#createdAt;};
    get updatedAt() {return this.#updatedAt;}; 
    get isDeleted() {return this.#isDeleted;};

    //Setters
    set id(id) {this.#id = id;};
    set firstName(firstName) {this.#firstName = firstName;};
    set lastName(lastName) {this.#lastName = lastName;};
    set lecturer(lecturer) {this.#lecturer = lecturer;};
    set article(article) {this.#article = article;};
    set createdAt(createdAt) {this.#createdAt = createdAt;};
    set updatedAt(updatedAt) {this.#updatedAt = updatedAt;}; 
    set isDeleted(isDeleted) {this.#isDeleted = isDeleted;};
 
}

module.exports = {
    Author,
}