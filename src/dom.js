import { addItem, addProject } from "./applicationLogic.js";

export default function functionality() {
    const mainBody = document.getElementById('main');
    const addButton = document.getElementById('addButton');
    const projectFormContainer = document.getElementById('projectFormContainer');
    const projectSubmitButton = document.getElementById('projectSubmitButton');
    const projectCloseButton = document.getElementById('projectClose')
    let addTaskId = "";
    let deleteProjectId = "";
    let projectEditID = ""
    let projectToDelete = document.getElementById(deleteProjectId);
    let toDoButtonList = [];
    let deleteButtonList = [];
    let projectList = [];
    let storedProjectList = []
    let projectEditButtonList = []
    let projectListInfo = [];
    let storedProjectListInfo = []
    let selectedProject = document.getElementById(addTaskId);


    // project functions

    function addToProjectList() {
        projectList.push([]);
    }

    function addProjectListInfo(project) {
        projectListInfo.push(project)
        storedProjectListInfo.push(project)
    }

    function createProjectContainer() {
        let projectContainer = document.createElement('div')
        mainBody.appendChild(projectContainer);
        return projectContainer
    }
    
    function createNewProject(projectContainer, project) {
        let newProject = document.createElement('div');
            newProject.classList.add("project")
            let projectInfo = document.createElement('p');
            projectInfo.classList.add('projectInfo')
            projectInfo.setAttribute('data-projectInfo', projectList.length - 1)
            projectInfo.textContent = project.info
            projectContainer.appendChild(newProject)
            newProject.appendChild(projectInfo);
        return newProject
        }
    
    function setNewProjectId(newProject) {
        newProject.setAttribute('id', projectList.length - 1);
        return newProject.id
    }
    

    function addSortButtons (newProject) {
        let sortButtons = document.createElement('div');
        let sortOptions = document.createElement('select');
        sortOptions.setAttribute('data-sortinput', projectList.length-1)
        sortButtons.classList.add('sortButtons')
        let sortName = document.createElement('option');
        sortName.setAttribute("value", "Name");
        sortName.textContent = "Sort By Name"
        let sortPriority = document.createElement('option');
        sortPriority.setAttribute("value", "Priority");
        sortPriority.textContent = "Sort By Priority"
        let sortDueDate = document.createElement('option');
        sortDueDate.setAttribute("value", "dueDate");
        sortDueDate.textContent = "Sort By Due Date"
        let sortComplete = document.createElement('option');
        sortComplete.setAttribute("value", "Completion");
        sortComplete.textContent = "Sort By Completion"
        let sortSubmit = document.createElement('button')
        sortSubmit.setAttribute('data-sort', projectList.length-1);
        sortSubmit.textContent = "Submit"
        newProject.appendChild(sortButtons);
        sortButtons.appendChild(sortOptions);
        sortOptions.appendChild(sortName)
        sortOptions.appendChild(sortPriority)
        sortOptions.appendChild(sortDueDate);
        sortOptions.appendChild(sortComplete)
        sortButtons.appendChild(sortSubmit)

        return sortSubmit
    }
    
    function addButtonSection(projectContainer) {
        let buttonSection = document.createElement('div');
            buttonSection.classList.add('buttonSection');
            buttonSection.setAttribute('data-projectButtons', projectList.length-1);
            projectContainer.appendChild(buttonSection);
            return buttonSection
    }   

      function addProjectAddButton(buttonSection) {
        let addToDo = document.createElement('button');
        addToDo.classList.add('addToDoButton');
        addToDo.setAttribute('data-add', projectList.length - 1);
        addToDo.innerText = "Add Task";
        buttonSection.appendChild(addToDo);
        return addToDo
    }
    
    function projectToDoButtonList(addToDo) {
        toDoButtonList.push(addToDo);
    }
    
    function addProjectDeleteButton(buttonSection) {
        let deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton');
        deleteButton.setAttribute('data-delete', projectList.length - 1);
        deleteButton.innerText = "Delete";
        buttonSection.appendChild(deleteButton);
        return deleteButton
    }
    
    function projectDeleteButtonList(deleteButton) {
        deleteButtonList.push(deleteButton);
    }

    function addProjectEditButton(buttonSection) {
        let editButton = document.createElement('button');
        editButton.classList.add('projectEditButton');
        editButton.setAttribute('data-projectedit', projectList.length - 1);
        editButton.innerText = "Edit Project";
        buttonSection.appendChild(editButton);
        return editButton
    }

    function projEditButtonList(editButton) {
        projectEditButtonList.push(editButton)
    }

    function projectEditButtonFunctionality(editButton) {
        editButton.addEventListener('click', function() {
            projectFormContainer.classList.remove('hidden');
            projectFormContainer.classList.add('edit')
            projectEditID = editButton.dataset.projectedit;
        })
    }
    
    function clearInputs() {
        let inputValues = Array.from(document.querySelectorAll('input'))
        for (let i=0; i<inputValues.length; i++) {
        inputValues[i].value = ""
        }
    }

    function addItemToProject(button) {
       button.addEventListener('click', function(){
            itemFormContainer.classList.remove('hidden');
            addTaskId = button.dataset.add;
            selectedProject = document.getElementById(addTaskId);
            itemForm.classList.remove('editItem');
            itemForm.classList.add('addItem')
            })
    }

    function deleteButtonFunctionality(button) {
        button.addEventListener('click', function(){
            deleteProjectId = button.dataset.delete;
            projectToDelete = document.getElementById(deleteProjectId);
            projectList.splice(deleteProjectId, 1, "");
            projectListInfo.splice(deleteProjectId, 1, "")
            toDoButtonList.splice(deleteProjectId, 1, "");
            deleteButtonList.splice(deleteProjectId, 1, "");
            toDoButtonList.splice(deleteProjectId, 1, "");
            let projectButtonsToDelete = document.querySelector(`[data-projectbuttons="${deleteProjectId}"]`)
            mainBody.removeChild(projectToDelete.parentNode);
            console.log(projectList)
            saveToLocalStorage();
        })}

    function sortProjectTasks(project, typeofSort) {
        if (typeofSort.value == "Name") {
            project.sort((a, b) => (a.title > b.title) ? 1 : -1)
            project.sort((a, b) => (a._title > b._title) ? 1 : -1)
        } else if (typeofSort.value == "Priority") {
            project.sort((a, b) => (a.priority > b.priority) ? 1 : -1)
            project.sort((a, b) => (a._priority > b._priority) ? 1 : -1)
        } else if (typeofSort.value == "Completion") {
            project.sort((a, b) => (a.status > b.status) ? -1 : 1)
            project.sort((a, b) => (a._status > b._status) ? -1 : 1)
        } else if (typeofSort.value == "dueDate") {
            project.sort((a, b) => (a.dueDate > b.dueDate) ? 1 : -1)
            project.sort((a, b) => (a._dueDate > b._dueDate) ? 1 : -1)
        }
    }

    function submitButtonSort(submitButton) {
        submitButton.addEventListener('click', function() {
        let submitButtonID = submitButton.dataset.sort
        let typeofSort = document.querySelector(`[data-sortinput="${submitButtonID}"]`);
        let projectToSort = projectList[submitButtonID]
        if (projectToSort.length != 0) {
            sortProjectTasks(projectToSort, typeofSort);
            displaySortedProject(submitButtonID, projectToSort)
            saveToLocalStorage() 
        }
    })
      }

    function displaySortedProject(submitButtonID, project){
        let projectToClear = document.getElementById(submitButtonID);
        removeAllChildNodes(projectToClear, project);
        for (let i =0; i< project.length; i++) {
            let newTask = document.createElement('div');
            newTask.classList.add("taskContainer");
            projectToClear.appendChild(newTask);            
            newTask.setAttribute('data-taskcontainer', `${submitButtonID}${[i]}`)
            newTask.setAttribute('data-specifictaskcontainer', [i])
            let newCheckbox = createCheckbox(projectList[submitButtonID][i], newTask);
            newCheckbox.setAttribute('data-checkbox', `${submitButtonID}${[i]}`)
            newCheckbox.setAttribute('data-specificcheckbox', [i])
            let newDiv = newItemDiv(newTask, projectList[submitButtonID][i])
            newDiv.setAttribute('data-task', `${submitButtonID}${[i]}`);
            newDiv.setAttribute('data-specifictask', [i])

            let itemButtons = newItemButtons(newTask);
            let editButton = newEditButton(itemButtons);
            editButton.setAttribute('data-edit', `${submitButtonID}${[i]}`)
            editButton.setAttribute('data-specificedit', [i])
            let deleteButton = newDeleteTaskButton(itemButtons);
            deleteButton.setAttribute('data-deleteItem', `${submitButtonID}${[i]}`)
            deleteButton.setAttribute('data-specificdeleteItem', [i])
            pushCheckboxToList(newCheckbox);
            pushEditToList(editButton);
            pushDeleteTaskToList(deleteButton);

            createEditButtonList();
            deleteTaskButtonFunctionality(deleteButton);
            addCheckboxStatus(newCheckbox);
            addTaskStatus(newCheckbox);
            changeStatusBarOnCheckboxClick(newCheckbox)
        }
    }

    function removeAllChildNodes(parent, projectToSort) {
        for (let i=0; i<projectToSort.length; i++) {
            parent.removeChild(parent.lastChild);
    }
    }

    function createStatusBar(section) {
        let statusBarContainer = document.createElement('div')
        statusBarContainer.classList.add('statusBarContainer')
        let statusBar = document.createElement('div');
        let percentageText = document.createElement('div')
        statusBar.classList.add('statusBar')
        statusBar.setAttribute('data-statusbar', projectList.length -1)
        percentageText.classList.add('percentageText')
        percentageText.setAttribute('data-percentagetext', projectList.length-1)
        section.appendChild(statusBarContainer)
        statusBarContainer.appendChild(statusBar)  
        statusBarContainer.appendChild(percentageText)
        return statusbar 
    }
  

// project event listeners

    addButton.addEventListener('click', function() {
        projectFormContainer.classList.remove('hidden')
    })
    

    projectSubmitButton.addEventListener('click', function() {
        if (!projectFormContainer.classList.contains('edit')) {
        addToProjectList();
        let newProject = addProject();
        let projectContainer = createProjectContainer();
        let project = createNewProject(projectContainer, newProject);
        addProjectListInfo(newProject)
        let projectID = setNewProjectId(project);
        let newStatusBar = createStatusBar(project)
        let sortButtons = addSortButtons(project);
        submitButtonSort(sortButtons)
        let buttonSection = addButtonSection(projectContainer);
        let editProjectButton = addProjectEditButton(buttonSection);
        projEditButtonList(editProjectButton)
        let addItemToProjectButton = addProjectAddButton(buttonSection);
        projectToDoButtonList(addItemToProjectButton);
        let deleteProjectButton = addProjectDeleteButton(buttonSection);
        projectDeleteButtonList(deleteProjectButton);
        addItemToProject(addItemToProjectButton);
        deleteButtonFunctionality(deleteProjectButton);
        projectEditButtonFunctionality(editProjectButton);

        projectFormContainer.classList.add('hidden');
        clearInputs();

        saveToLocalStorage();
        console.log(projectList)
    }
    })

    projectSubmitButton.addEventListener('click', function() {
        if (projectFormContainer.classList.contains('edit')) {
            let projectToRevise = document.querySelector(`[data-projectinfo="${projectEditID}"]`); 
            let revisedProject = addProject();
            projectListInfo.splice(projectEditID, 1, revisedProject)
            projectToRevise.textContent = revisedProject.info
            clearInputs()
            projectFormContainer.classList.add('hidden');
            projectFormContainer.classList.remove('edit')
            saveToLocalStorage() 
        }
    })

    projectCloseButton.addEventListener('click', function() {
        projectFormContainer.classList.add('hidden')
    })

// task section

    const itemFormContainer = document.getElementById("itemFormContainer");
    let itemForm = document.getElementById('itemForm');
    let deleteTaskButtonId = "";
    let editTaskButtonList = []
    let deleteTaskButtonList = []
    const itemSubmitButton = document.getElementById('itemSubmitButton');
    let editButtonId = "";
    let selectedTaskToEdit = document.getElementById(editButtonId);
    let taskToDelete = document.getElementById(deleteTaskButtonId);
    let resetButton = document.getElementById('reset')
    const taskCloseButton = document.getElementById('taskClose');
    let checkBoxToChange = document.querySelector(`[data-checkbox="${editButtonId}"]`)
    let checkboxList = []
    let taskList = []


    // task functions 
    
    function addTask() {
            let item = addItem();
            if (item != undefined && item.dueDate != "") {
                addItemToProjectList(item)
                let newTask = newTaskContainer();
                newTask.setAttribute('data-taskcontainer', `${[addTaskId]}${projectList[addTaskId].length -1}`)
                newTask.setAttribute('data-specifictaskcontainer', `${projectList[addTaskId].length -1}`)
                let newCheckbox = createCheckbox(item, newTask);
                newCheckbox.setAttribute('data-checkbox', `${[addTaskId]}${projectList[addTaskId].length -1}`)
                newCheckbox.setAttribute('data-specificcheckbox', `${projectList[addTaskId].length -1}`)
                let newDiv = newItemDiv(newTask, item);
                newDiv.setAttribute('data-task', `${[addTaskId]}${projectList[addTaskId].length -1}`);
                newDiv.setAttribute('data-specifictask', `${projectList[addTaskId].length -1}`);

                fillOutStatusBar();

                let itemButtons = newItemButtons(newTask);
                let editButton = newEditButton(itemButtons);
                editButton.setAttribute('data-edit', `${[addTaskId]}${projectList[addTaskId].length -1}`)
                editButton.setAttribute('data-specificedit', `${projectList[addTaskId].length -1}`)
                let deleteButton = newDeleteTaskButton(itemButtons);
                deleteButton.setAttribute('data-deleteItem', `${[addTaskId]}${projectList[addTaskId].length -1}`)
                deleteButton.setAttribute('data-specificdeleteItem', `${projectList[addTaskId].length -1}`)
                pushCheckboxToList(newCheckbox);
                pushEditToList(editButton);
                pushDeleteTaskToList(deleteButton);

                createEditButtonList();
                deleteTaskButtonFunctionality(deleteButton);
                addCheckboxStatus(newCheckbox);
                changeStatusBarOnCheckboxClick(newCheckbox);
                addTaskStatus(newCheckbox);

                clearInputs();
                itemFormContainer.classList.add('hidden');

                saveToLocalStorage()
            } else {
                alert ("Please Fill Out Required Fields")
            }
        }


    function newTaskContainer() {
        let taskContainer = document.createElement('div');
        taskContainer.classList.add("taskContainer");
        selectedProject.appendChild(taskContainer);
        return taskContainer
    }


    function newItemDiv(taskContainer, item) {
        let newTask = document.createElement('div');
        newTask.classList.add('newTask');
        if (item.status != 'Complete' && item._status != "Complete") {
            newTask.classList.add('taskNotComplete')
        } else {
            newTask.classList.add('taskComplete')
        }
        newTask.textContent = item.info;
        taskContainer.appendChild(newTask);
        return newTask
    }

    function addItemToProjectList(item){
        projectList[addTaskId].push(item);
    }

    function createCheckbox(item, taskContainer) {
        let checkbox = document.createElement('button');
        checkbox.classList.add('checkbox');
        if (item.status != 'Complete') {
            if (item._status != 'Complete') {
            checkbox.classList.add('notComplete');
            taskContainer.appendChild(checkbox);
            } else if (item._status == 'Complete') {
                checkbox.classList.add('Complete');
                taskContainer.appendChild(checkbox);
            }
        } else if (item._status == 'Complete') {
            checkbox.classList.add('Complete');
            taskContainer.appendChild(checkbox);
        }
        return checkbox
    }

    function newItemButtons(taskContainer) {
        let itemButtons = document.createElement('div');
        itemButtons.classList.add('itemButtons');
        taskContainer.appendChild(itemButtons);
        return itemButtons 
    }

    function newEditButton(itemButtons) {
        let editTask = document.createElement('button');
        editTask.innerText = "Edit Task";
        editTask.classList.add('editTaskButton');
        itemButtons.appendChild(editTask);
        return editTask
    }

    function newDeleteTaskButton(itemButtons) {
        let deleteTask = document.createElement('button');
        deleteTask.innerText = "Delete Task";
        deleteTask.classList.add('deleteTaskButton');
        itemButtons.appendChild(deleteTask);
        return deleteTask
    }


    function pushCheckboxToList(checkbox) {
        checkboxList.push(checkbox)
    }

    function pushEditToList(newEditButton) {
        editTaskButtonList.push(newEditButton);
    }

    function pushDeleteTaskToList(newDeleteButton) {
        deleteTaskButtonList.push(newDeleteButton)
    }

    function createEditButtonList(){
        for (let i=0; i < editTaskButtonList.length; i++) {
            editTaskButtonList[i].addEventListener('click', function(){
                itemFormContainer.classList.remove('hidden');
                itemForm.classList.remove('addItem');
                itemForm.classList.add('editItem');
                editButtonId = editTaskButtonList[i].dataset.edit;
                selectedTaskToEdit = document.querySelector(`[data-task="${editButtonId}"]`);
                })
            }
        }
    
    function deleteTaskButtonFunctionality(button) {
        button.addEventListener('click', function() {
            deleteTaskButtonId =  button.dataset.deleteitem;
            let specificID = button.dataset.specificdeleteitem;
            taskToDelete =  document.querySelector(`[data-taskContainer="${deleteTaskButtonId}"]`);
            let projectParent = taskToDelete.parentNode;
            projectParent.removeChild(taskToDelete);
            deleteTaskButtonList.splice(specificID, 1);
            editTaskButtonList.splice(specificID, 1);
            checkboxList.splice(specificID, 1);
            let projectParentId = projectParent.id
            projectList[projectParentId].splice(specificID, 1);
            fillDeletedStatusBar(projectParentId);
            saveToLocalStorage()
            })
        }

    function editItem(){
        itemForm.classList.remove('addItem');
        let revisedItem = addItem();
        if (revisedItem != undefined && revisedItem.dueDate != "") {
            selectedTaskToEdit.innerText = "";
            selectedTaskToEdit.innerText = revisedItem.info;
            editProjectList(revisedItem);
            editTaskStatus(revisedItem);
            editCheckboxStatus(revisedItem);
            fillEditedStatusBar();
            clearInputs();
            itemFormContainer.classList.add('hidden');
            saveToLocalStorage()
        } else  {
            alert ("Please Fill Out Required Fields")
        }
    }


    function editProjectList(revisedItem) {
        let taskIDtaskContainer = selectedTaskToEdit.parentNode
        let taskID = selectedTaskToEdit.dataset.specifictask
        let parentProject = taskIDtaskContainer.parentNode.id
        projectList[parentProject].splice(taskID, 1, revisedItem)
    }

    function editCheckboxStatus(item){
        if (item.status != 'Complete') {
            checkBoxToChange = document.querySelector(`[data-checkbox="${editButtonId}"]`);
             checkBoxToChange.classList.add('notComplete');
            checkBoxToChange.classList.remove('Complete');
        } else if (item.status == 'Complete') {
            checkBoxToChange = document.querySelector(`[data-checkbox="${editButtonId}"]`)
            checkBoxToChange.classList.add('Complete');
            checkBoxToChange.classList.remove('notComplete');
        }
    }

    function editTaskStatus(item) {
        let changedTask = document.querySelector(`[data-task="${editButtonId}"]`);
        let changedTaskID = changedTask.dataset.specifictask
        let taskContainer = changedTask.parentNode;
        let taskProject = taskContainer.parentNode.id;
        if (item.status != 'Complete') {
            changedTask.classList.add('taskNotComplete');
            changedTask.classList.remove('taskComplete');
            projectList[taskProject][changedTaskID].status = 'Not Complete'
        } else if (item.status == 'Complete') {
            changedTask.classList.remove('taskNotComplete');
            changedTask.classList.add('taskComplete');
            projectList[taskProject][changedTaskID].status = 'Complete'
        }
    }

    function changeStatusBarOnCheckboxClick(checkbox) {
        checkbox.addEventListener('click', function() {
        let filteredProject = filterProject();
        let taskContainer = checkbox.parentNode;
        let selectedProject = taskContainer.parentNode.id
        let selectedStatusBar = document.querySelector(`[data-statusbar="${selectedProject}"]`);
        let statusBlock = document.createElement('div');
        if (selectedStatusBar.firstChild) {
            selectedStatusBar.removeChild(selectedStatusBar.firstChild)
        } else {
        }
        statusBlock.style.width = `${filteredProject.percentageArray[selectedProject]}%`
        statusBlock.style.height = "100%"            
        selectedStatusBar.appendChild(statusBlock)
        displayPercentage(selectedStatusBar, filteredProject.percentageArray[selectedProject]);
    })
}

    function addCheckboxStatus(checkbox) {
      checkbox.addEventListener('click', function() {
            let checkboxID = checkbox.dataset.specificcheckbox;
            let checkboxContainer = checkbox.parentNode;
            let checkboxProject = checkboxContainer.parentNode.id
            if (checkbox.classList.contains('notComplete')) {
                checkbox.classList.remove('notComplete');
                checkbox.classList.add('Complete');
                projectList[checkboxProject][checkboxID].status = 'Complete'
            } else if (checkbox.classList.contains('Complete')) {
                checkbox.classList.add('notComplete');
                checkbox.classList.remove('Complete');
                projectList[checkboxProject][checkboxID].status = 'Not Complete'
            }
            saveToLocalStorage();
        })

    }

    function addTaskStatus(checkbox) {
        checkbox.addEventListener('click', function() {
            let checkboxID = checkbox.dataset.checkbox
            let taskToChange = document.querySelector(`[data-task="${checkboxID}"]`)
            if (checkbox.classList.contains('Complete')) {
                taskToChange.classList.remove('taskNotComplete');
                taskToChange.classList.add('taskComplete');
            } else if (checkbox.classList.contains('notComplete')) {
                taskToChange.classList.add('taskNotComplete');
                taskToChange.classList.remove('taskComplete');
            }
        })
    }
    

    function filterProject() {
        let filteredArrayList = []
        let percentageArray = []
        for (let i = 0; i < projectList.length; i++) {
            if (typeof projectList[i] === 'object') {
                let filteredArray = projectList[i].filter(filterByComplete)
                filteredArrayList.push(filteredArray)
                let percentage = Math.round(filteredArray.length / projectList[i].length * 100); 
                percentageArray.push(percentage)
            } else {
                filteredArrayList.push("")
                percentageArray.push("")

            }
        }
            return {filteredArrayList, percentageArray}
        }
    

    function filterByComplete(item) {
        return item._status == 'Complete'
    } 

    
    function addToStatusBar(percentage) {
        let selectedStatusBar = document.querySelector(`[data-statusbar="${addTaskId}"]`);
        let statusBlock = document.createElement('div');
        if (selectedStatusBar.firstChild) {
            selectedStatusBar.removeChild(selectedStatusBar.firstChild)
        } else {
        }
        statusBlock.style.width = `${percentage}%`
        statusBlock.style.height = "100%"            
        selectedStatusBar.appendChild(statusBlock)
        return selectedStatusBar
        }   
    

    function editStatusBar(percentage) {
        let taskContainer = selectedTaskToEdit.parentNode
        let parentProject = taskContainer.parentNode.id
        let selectedStatusBar = document.querySelector(`[data-statusbar="${parentProject}"]`);
        let statusBlock = document.createElement('div');
        if (selectedStatusBar.firstChild) {
            selectedStatusBar.removeChild(selectedStatusBar.firstChild)
            } else {
            }
        statusBlock.style.width = `${percentage}%`
        statusBlock.style.height = "100%"
        selectedStatusBar.appendChild(statusBlock)
        return selectedStatusBar
            }   

    function deleteStatusBar(percentage, project) {
        let selectedStatusBar = document.querySelector(`[data-statusbar="${project}"]`);
        let statusBlock = document.createElement('div');
        if (selectedStatusBar.firstChild) {
            selectedStatusBar.removeChild(selectedStatusBar.firstChild)
            } else {
            }
        statusBlock.style.width = `${percentage}%`
        statusBlock.style.height = "100%"
        selectedStatusBar.appendChild(statusBlock)
        return selectedStatusBar
    }

    function displayPercentage(statusBar, percentage) {
        let selectedStatusBarID = statusBar.dataset.statusbar;
        let selectedPercentageText = document.querySelector(`[data-percentagetext="${selectedStatusBarID}"]`);
        selectedPercentageText.innerText = `${percentage}% Complete`;
    }


    function fillOutStatusBar() {
        let filteredProject = filterProject();
        let statusBar = addToStatusBar(filteredProject.percentageArray[addTaskId]);
        displayPercentage(statusBar, filteredProject.percentageArray[addTaskId]);
        }

    function fillEditedStatusBar() {
        let filteredProject = filterProject();
        let taskContainer = selectedTaskToEdit.parentNode
        let parentProject = taskContainer.parentNode.id
        let statusBar = editStatusBar(filteredProject.percentageArray[parentProject]);
        if (filteredProject.percentageArray[parentProject] != NaN) {
        displayPercentage(statusBar, filteredProject.percentageArray[parentProject]);
        }
    }

    function fillDeletedStatusBar(projectToDelete) {
        let filteredProject = filterProject();
        let parentProject = projectToDelete
        let statusBar = deleteStatusBar(filteredProject.percentageArray[parentProject], parentProject);
        if (isNaN(filteredProject.percentageArray[parentProject]) == false) {
            displayPercentage(statusBar, filteredProject.percentageArray[parentProject]);
        } else {
            let selectedStatusBarID = statusBar.dataset.statusbar;
            let selectedPercentageText = document.querySelector(`[data-percentagetext="${selectedStatusBarID}"]`);
            selectedPercentageText.innerText = ""
        }
    }


    //event listener
    
    itemSubmitButton.addEventListener('click', function() {
        if (itemForm.classList.contains('addItem')) {
        addTask();
    } else if (itemForm.classList.contains('editItem')) {
        editItem();
    }
})

    resetButton.addEventListener('click', () => clearInputs())

    taskCloseButton.addEventListener('click', () => itemFormContainer.classList.add('hidden'))

// local storage 

function saveToLocalStorage() {
    localStorage.setItem(`storedProjectList`, JSON.stringify(projectList));
    localStorage.setItem(`projectInfo`, JSON.stringify(projectListInfo))
}

function getItemFromLocalStorage() {
   let pullTasks = JSON.parse(localStorage.getItem('storedProjectList'));
   let pullProjects = JSON.parse(localStorage.getItem('projectInfo'));
   for (const projectInfo in pullProjects) {
        let storedProjectInfo = pullProjects[projectInfo]
        if (storedProjectInfo._title != undefined) {
        addBackProjectMethods(storedProjectInfo);
        displayStoredProject(storedProjectInfo)
        } else {
            projectListInfo.push("");
            projectList.push("")
        }        
   }
    for (const project in pullTasks) {
            if (pullTasks[project] != "") {
                pullTasks[project].forEach(function(item) {
                selectedProject = document.getElementById(project);
                addTaskId = project;
                let storedItem = item
                addBackTaskMethods(storedItem)
                console.log(storedItem._status)
                createStoredTask(storedItem)
                console.log(storedItem)
                })
        }        
        }
    }


function addBackTaskMethods(item) {
    Object.defineProperty(item, 'status', {
        set(x) { item._status = x; }
    })

    function info(item) {
        return (`Title: ${item._title} \r\n
        Description: ${item._description} \r\n
        Due Date: ${item._dueDate} \r\n
        Priority: ${item._priority} \r\n
        Notes: ${item._notes} `) 
    }
    item.info = info(item)
}

function addBackProjectMethods(project) {
    function info(project) {
        return (`Project Title: ${project._title} \r\n
        Project Description: ${project._description} \r\n`)
    }
    project.info = info(project)
}

function displayStoredProject(storedProject) {
    addToProjectList();
    let projectContainer = createProjectContainer();
    let project = createNewProject(projectContainer, storedProject);
    addProjectListInfo(storedProject)
    let projectID = setNewProjectId(project);
    let newStatusBar = createStatusBar(project)
    let sortButtons = addSortButtons(project);
    submitButtonSort(sortButtons)
    let buttonSection = addButtonSection(projectContainer);
    let editProjectButton = addProjectEditButton(buttonSection);
    projEditButtonList(editProjectButton)
    let addItemToProjectButton = addProjectAddButton(buttonSection);
    projectToDoButtonList(addItemToProjectButton);
    let deleteProjectButton = addProjectDeleteButton(buttonSection);
    projectDeleteButtonList(deleteProjectButton);
    addItemToProject(addItemToProjectButton);
    deleteButtonFunctionality(deleteProjectButton);
    projectEditButtonFunctionality(editProjectButton);
}

function createStoredTask(item) {
    addItemToProjectList(item)
    let newTask = newTaskContainer();
    newTask.setAttribute('data-taskcontainer', `${[addTaskId]}${projectList[addTaskId].length -1}`)
    newTask.setAttribute('data-specifictaskcontainer', `${projectList[addTaskId].length -1}`)
    let newCheckbox = createCheckbox(item, newTask);
    newCheckbox.setAttribute('data-checkbox', `${[addTaskId]}${projectList[addTaskId].length -1}`)
    newCheckbox.setAttribute('data-specificcheckbox', `${projectList[addTaskId].length -1}`)
    let newDiv = newItemDiv(newTask, item);
    newDiv.setAttribute('data-task', `${[addTaskId]}${projectList[addTaskId].length -1}`);
    newDiv.setAttribute('data-specifictask', `${projectList[addTaskId].length -1}`);

    fillOutStatusBar();

    let itemButtons = newItemButtons(newTask);
    let editButton = newEditButton(itemButtons);
    editButton.setAttribute('data-edit', `${[addTaskId]}${projectList[addTaskId].length -1}`)
    editButton.setAttribute('data-specificedit', `${projectList[addTaskId].length -1}`)
    let deleteButton = newDeleteTaskButton(itemButtons);
    deleteButton.setAttribute('data-deleteItem', `${[addTaskId]}${projectList[addTaskId].length -1}`)
    deleteButton.setAttribute('data-specificdeleteItem', `${projectList[addTaskId].length -1}`)
    pushCheckboxToList(newCheckbox);
    pushEditToList(editButton);
    pushDeleteTaskToList(deleteButton);

    createEditButtonList();
    deleteTaskButtonFunctionality(deleteButton);
    addCheckboxStatus(newCheckbox);
    changeStatusBarOnCheckboxClick(newCheckbox);
    addTaskStatus(newCheckbox);
}

window.onload = () => {
    getItemFromLocalStorage();
}


}

