export default class ToDoItem {
    constructor(title, description, dueDate, priority, notes, status) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.status = status;
    }

    get title() {
        return (this._title)
    }

    get status() {
        return (`${this._status}`)
    }

    get dueDate() {
        return (this._dueDate)
    }

    get priority() {
        return (this._priority)
    }

    get info() {
        return (`Title: ${this._title} \r\n
        Description: ${this._description} \r\n
        Due Date: ${this._dueDate} \r\n
        Priority: ${this._priority} \r\n
        Notes: ${this._notes} `) 
    }

    set title(newTitle) {
        this._title = newTitle
    }

    set description(newDescription) {
        this._description = newDescription
    }

    set priority(newPriority) {
        this._priority = newPriority
    }

    set dueDate(newDueDate) {
        this._dueDate = newDueDate
    }

    set notes(newNotes) {
        this._notes = newNotes
    }

    set status(newStatus) {
        this._status = newStatus
    }

    
}


