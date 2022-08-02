import ToDoItem from "./task.js";

export function addItem() {
    let itemName = document.getElementById('itemName').value;
    let itemDescription = document.getElementById('itemDescription').value;
    let dueDate = document.getElementById('dueDate').value;
    let priority = document.getElementById('priority').value;
    let notes = document.getElementById('notes').value;
    let complete = document.getElementById('complete').value;

    let item = new ToDoItem(itemName, itemDescription, dueDate, priority, notes, complete);
    return item;
    
}

