import './style.css';
import {todoConstructor,setWorkingProject} from './todoFunctions.js';
import {addTodoDiv,showTaskForm,hideTaskForm,showNewProjectMenu,hideNewProjectMenu,addNewProjectDOM} from './domManipulation.js';
import {addTask} from './handleUserInputData.js'

const todoContent=document.querySelector('.todo-content');

//form********************************************
const addTaskButton=todoContent.querySelector('.addTask');
const newTaskForm=todoContent.querySelector('#newTaskForm');
//Form inputs
const newTaskTitle=newTaskForm.querySelector('#newTaskForm-taskTitle');
const newTaskDetail=newTaskForm.querySelector('#newTaskForm-taskDetail');
const newTaskDate=newTaskForm.querySelector('#newTaskForm-taskDueDate');
const taskProjectSelect=newTaskForm.querySelector('#newTaskForm-projectDropDown')
//form btn
const formNewTaskBtn=newTaskForm.querySelector(".newTaskForm-addTaskBtn");//confirms adding new task
const formCancelTaskBtn=newTaskForm.querySelector(".newTaskForm-cancelTaskBtn");//confirms adding new task
/*********************************************** */

/*Project menu************************************/
const sidebarProjectContainer=document.querySelector('.sidebar-projectContainer');
const addNewProjectBtn=sidebarProjectContainer.querySelector('#addNewProjectBtn');
const addProjectBtn=sidebarProjectContainer.querySelector('#projectTitleInput-addBtn');
const cancelProjectBtn=sidebarProjectContainer.querySelector('#projectTitleInput-cancelBtn');

const newProjectInputMenu=sidebarProjectContainer.querySelector('.newProjectInputMenu');
const newProjectInputField=newProjectInputMenu.querySelector('#projectTitleInput');
/*************************************************/
let todoArray = []; //contains all arrays.
let todoProject=[]; //contains all project arrays.
let workingProject='Default';//default project. Changing projects will change this global variables.

addTaskButton.onclick=() => {
    showTaskForm();
};
/*New task form event listeners*****************************/

newTaskForm.onsubmit=(e)=>{
    e.preventDefault(); ///prevents refresh of page
    hideTaskForm();//hides form
    const task = todoConstructor(newTaskTitle.value,newTaskDetail.value,newTaskDate.value,workingProject);
    addTodoDiv(task); //adds a div in the DOM
    todoArray.push(task);
    newTaskForm.reset(); //resets form
    console.log(task);
}
/***********************************************************/


//event lister for sidebar project container
//shows new project menu
addNewProjectBtn.onclick=()=>{
    showNewProjectMenu();
}

cancelProjectBtn.onclick=()=>{
    hideNewProjectMenu();
}
addProjectBtn.onclick=()=>{
    hideNewProjectMenu();
    let projectId=addNewProjectDOM(newProjectInputField.value);
    newProjectInputField.value='';

    const newProject=sidebarProjectContainer.querySelector(`#${projectId}`);
    workingProject=setWorkingProject(newProject);//sets current active project
    newProject.addEventListener('click',()=>{
        workingProject=setWorkingProject(newProject);//sets current working project
    });
}
/*
Adding new project
    user clicks on add new project button
    input shows up with add and cancel buttons
    a new project is displayed under projects 

*/