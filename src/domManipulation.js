import formatISO from "date-fns/formatISO";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import parseJSON from "date-fns/parseJSON";

function addTodoDiv(parentDiv,todoObject){
    const todoContainer=document.createElement('div');
    const todoTitle=document.createElement('h1');
    const todoDetail=document.createElement('p');
    const todoDueDate=document.createElement('input');
    const deleteBtn=document.createElement('button');

    if(todoObject.todoDueDate=='Invalid Date'||todoObject.todoDueDate==''){
        let date=new Date();
        date.setHours(0,0,0,0); //sets the time to 0.
        todoObject.todoDueDate=date; 
    }

    const todoDueDateParsed=parseJSON(todoObject.todoDueDate); //parse the json date string into date instance

    todoContainer.setAttribute('class','todoContainer');
    todoContainer.setAttribute('id',todoObject.todoId);    
    todoTitle.setAttribute('contenteditable','true');
    todoTitle.setAttribute('id',`${todoObject.todoId}-title`); 
    todoDetail.setAttribute('contenteditable','true');
    todoDetail.setAttribute('id',`${todoObject.todoId}-detail`); 
    todoDueDate.setAttribute('contenteditable','true'); 
    todoDueDate.setAttribute('type','date');
    todoDueDate.setAttribute('value',format(todoDueDateParsed,'y-MM-dd'));  
    todoDueDate.setAttribute('id',`${todoObject.todoId}-dueDate`);  

    deleteBtn.setAttribute('id',`${todoObject.todoId}-deleteBtn`);  
    deleteBtn.setAttribute('class',`taskDeleteBtn`);  

    todoTitle.innerText=todoObject.todoTitle;
    todoDetail.innerText=todoObject.todoDetails;
    deleteBtn.innerText='Done';

    todoContainer.append(todoTitle,todoDetail,todoDueDate,deleteBtn);
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
function addNewProjectDOM(projectId,projectList,projectTitle){
    const newProjectBtn=document.createElement('button');
    newProjectBtn.setAttribute('class','projectBtn');
    newProjectBtn.setAttribute('id',projectId);
    newProjectBtn.innerText=projectTitle;
    projectList.append(newProjectBtn);
    return projectId; //returns the id
}

//updates DOM with given object array.
//Input: Element Arrays and the class name of the elements its replacing
//      which is todoContainer in this case
//      parentdiv is the div to which the elements will be the children of
function projectDOMRefresh(projectArray,elementsToRemove,parentDiv){
    removeElementsByClass(elementsToRemove);
    projectArray.forEach(function(todoObject){
            addTodoDiv(parentDiv,todoObject);
    })
    return projectArray;
}
//From: https://stackoverflow.com/questions/4777077/removing-elements-by-class-name
function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

export {addTodoDiv,showTaskForm,hideTaskForm,showNewProjectMenu,hideNewProjectMenu,addNewProjectDOM,projectDOMRefresh};