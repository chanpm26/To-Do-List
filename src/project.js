export default class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }

    get title() {
        return (this._title)
    }

    get description() {
        return (this._description)
    }

    get info() {
        return (`Project Title: ${this._title} \r\n
        Project Description: ${this._description} `) 
    }

    set title(newTitle) {
        this._title = newTitle
    }

    set description(newDescription) {
        this._description = newDescription
    }
}