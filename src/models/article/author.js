class Author {
    #id;            //string
    #firstName;     //string
    #lastName;      //string
    #lecturer;      //Lecturer  

    //meta data
    #createdAt;     //datetime
    #updatedAt;     //datetime
    #isDeleted;     //boolean

    //Getters
    getId() {return this.#id;}; 
    getFirstName() {return this.#firstName;};
    getLastName() {return this.#lastName;};
    getLecturer() {return this.#lecturer;}; 
    getCreatedAt() {return this.#createdAt;};
    getUpdatedAt() {return this.#updatedAt;}; 
    getIsDeleted() {return this.#isDeleted;};

    //Setters
    setId(id) {this.#id = id;};
    setFirstName(firstName) {this.#firstName = firstName;};
    setLastName(lastName) {this.#lastName = lastName;};
    setLecturer(lecturer) {this.#lecturer = lecturer;};
    setCreatedAt(createdAt) {this.#createdAt = createdAt;};
    setUpdatedAt(updatedAt) {this.#updatedAt = updatedAt;}; 
    setIsDeleted(isDeleted) {this.#isDeleted = isDeleted;};
 
}

module.exports = {
    Author,
}