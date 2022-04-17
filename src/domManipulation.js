function addTodoDiv(parentDiv,todoObject){
    const todoContainer=document.createElement('div');
    const todoTitle=document.createElement('h1');
    const todoDetail=document.createElement('p');
    const todoDueDate=document.createElement('p');

    todoContainer.setAttribute('class','todoContainer');
    todoTitle.innerText=todoObject.todoTitle;
    todoDetail.innerText=todoObject.todoDetails;
    todoDueDate.innerText=todoObject.todoDueDate;

    todoContainer.append(todoTitle,todoDetail,todoDueDate);
    parentDiv.append(todoContainer);
}

//Show form
function showTaskForm(parentDiv,addTaskButton){
    const taskInputForm=parentDiv.querySelector('#newTaskForm');
    taskInputForm.style.display = 'flex';
    addTaskButton.style.display='none'; //hides add button
}   

//hide form
function hideTaskForm(parentDiv,addTaskButton){
    const taskInputForm=parentDiv.querySelector('#newTaskForm');
    taskInputForm.style.display = 'none';
    addTaskButton.style.display='inline-block'; //hides add button
}

//show sidebar project form/menu
function showNewProjectMenu(addNewProjectBtn,newProjectInputMenu){
    addNewProjectBtn.style.display='none';
    newProjectInputMenu.style.display='block';
}

//hide sidebar project form/menu
function hideNewProjectMenu(addNewProjectBtn,newProjectInputMenu){
    addNewProjectBtn.style.display='block';
    newProjectInputMenu.style.display='none';
}

//adds new project button to sidebar
function addNewProjectDOM(projectName,projectList){
    const newProjectBtn=document.createElement('button');
    newProjectBtn.setAttribute('class','projectBtn');
    newProjectBtn.setAttribute('id',projectName.replace(' ','-'));
    newProjectBtn.innerText=projectName;
    projectList.append(newProjectBtn);
    return projectName.replace(' ','-'); //returns the id
}

//!This should just take in an array and display it. The sorting should be done elsewhere
//updates DOM with given object array.
//Input: Element Arrays and the class name of the elements its replacing
//      which is todoContainer in this case
//      parentdiv is the div to which the elements will be the children of
function projectDOMRefresh(projectArray,elementsToRemove,parentDiv){
    removeElementsByClass(elementsToRemove);
    projectArray.forEach(function(todoObject){
            addTodoDiv(parentDiv,todoObject);
    })
}
//From: https://stackoverflow.com/questions/4777077/removing-elements-by-class-name
function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

export {addTodoDiv,showTaskForm,hideTaskForm,showNewProjectMenu,hideNewProjectMenu,addNewProjectDOM,projectDOMRefresh};