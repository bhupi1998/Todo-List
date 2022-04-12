const todoContent=document.querySelector('.todo-content');
const addTaskButton=todoContent.querySelector('.addTask');

/*Project menu************************************/
const sidebarProjectContainer=document.querySelector('.sidebar-projectContainer');
const addNewProjectBtn=sidebarProjectContainer.querySelector('#addNewProjectBtn');
const newProjectInputMenu=sidebarProjectContainer.querySelector('.newProjectInputMenu');
const projectList=sidebarProjectContainer.querySelector('.projectList');
/*************************************************/

function addTodoDiv(todoObject){
    const todoContainer=document.createElement('div');
    const todoTitle=document.createElement('h1');
    const todoDetail=document.createElement('p');
    const todoDueDate=document.createElement('p');

    todoContainer.setAttribute('class','todoContainer');
    
    todoTitle.innerText=todoObject.todoTitle;
    todoDetail.innerText=todoObject.todoDetails;
    todoDueDate.innerText=todoObject.todoDueDate;

    todoContainer.append(todoTitle,todoDetail,todoDueDate);
    todoContent.append(todoContainer);
}

//Show form
function showTaskForm(){
    const taskInputForm=todoContent.querySelector('#newTaskForm');
    taskInputForm.style.display = 'flex';
    addTaskButton.style.display='none'; //hides add button
}   

//hide form
function hideTaskForm(){
    const taskInputForm=todoContent.querySelector('#newTaskForm');
    taskInputForm.style.display = 'none';
    addTaskButton.style.display='inline-block'; //hides add button
}

//show sidebar project form/menu
function showNewProjectMenu(){
    addNewProjectBtn.style.display='none';
    newProjectInputMenu.style.display='block';
}

//hide sidebar project form/menu
function hideNewProjectMenu(){
    addNewProjectBtn.style.display='block';
    newProjectInputMenu.style.display='none';
}

//adds new project button to sidebar
function addNewProjectDOM(projectName){
    const newProjectBtn=document.createElement('button');
    newProjectBtn.setAttribute('class','projectBtn');
    newProjectBtn.setAttribute('id',projectName.replace(' ','-'));
    newProjectBtn.innerText=projectName;
    projectList.append(newProjectBtn);
    return projectName.replace(' ','-'); //returns the id
}

//updates DOM based on project
function projectDOMRefresh(projectArray,currentWorkingArray){
    removeElementsByClass('todoContainer');
    projectArray.forEach(function(todoObject){
        if(todoObject.project == currentWorkingArray)
            addTodoDiv(todoObject)
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