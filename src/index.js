import './style.css';
import {todoConstructor,setWorkingProject,todoProjectObjects,todoDateObjects,makeTaskEditable} from './todoFunctions.js';
import {addTodoDiv,showTaskForm,hideTaskForm,showNewProjectMenu,hideNewProjectMenu,addNewProjectDOM,projectDOMRefresh} from './domManipulation.js';
import {} from './dateSorting.js'

import {compareAsc,parse,parseISO,add} from 'date-fns';

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
const projectList=sidebarProjectContainer.querySelector('.projectList');

const newProjectInputMenu=sidebarProjectContainer.querySelector('.newProjectInputMenu');
const newProjectInputField=newProjectInputMenu.querySelector('#projectTitleInput');
/*************************************************/

/*Date buttons*/
const todayTodoBtn=sidebarProjectContainer.querySelector('#todayBtn');
const weekTodoBtn=sidebarProjectContainer.querySelector('#weekBtn');
/**/
let todoArray = []; //contains all arrays.
let todoProject=[]; //contains all project arrays.
let workingProject='Default';//default project. Changing projects will change this global variables.
let todayDate=new Date(); //today's date
todayDate.setHours(0,0,0,0); //sets the time to 0. 
let projectIdGlobal=0;//used to assign Ids to projects
let taskIdGlobal=0;//used to assign Ids to tasks.

function initialSetUp(){
    const newProject=sidebarProjectContainer.querySelector(`#defaultProject`);
    workingProject=setWorkingProject(newProject);//sets current active project
    newProject.addEventListener('click',()=>{
        workingProject=setWorkingProject(newProject);//sets current working project
        let displayedObjects=projectDOMRefresh(todoProjectObjects(todoArray,workingProject),'todoContainer',todoContent);
        makeTaskEditable(todoContent,displayedObjects);
        console.log(workingProject);
    });
}

initialSetUp();

addTaskButton.onclick=() => {
    showTaskForm(todoContent,addTaskButton);
};
/*New task form event listeners*****************************/

newTaskForm.onsubmit=(e)=>{
    e.preventDefault(); ///prevents refresh of page
    hideTaskForm(todoContent,addTaskButton);//hides form
    const task = todoConstructor(newTaskTitle.value,newTaskDetail.value,newTaskDate.value,workingProject,taskIdGlobal);
    taskIdGlobal++;
    addTodoDiv(todoContent,task); //adds a div in the DOM   
    let taskArray=[task];
    makeTaskEditable(todoContent,taskArray);

    todoArray.push(task);
    newTaskForm.reset(); //resets form
    console.log(task);
}
/***********************************************************/


//event lister for sidebar project container
//shows new project menu
addNewProjectBtn.onclick=()=>{
    showNewProjectMenu(addNewProjectBtn,newProjectInputMenu);
}

cancelProjectBtn.onclick=()=>{
    hideNewProjectMenu(addNewProjectBtn,newProjectInputMenu);
}
addProjectBtn.onclick=()=>{
    hideNewProjectMenu(addNewProjectBtn,newProjectInputMenu);
    let projectId=addNewProjectDOM(`project-${projectIdGlobal}`,projectList,newProjectInputField.value);
    projectIdGlobal++;
    newProjectInputField.value='';
    const newProject=sidebarProjectContainer.querySelector(`#${projectId}`);
    workingProject=setWorkingProject(newProject);//sets current active project
    newProject.addEventListener('click',()=>{
        workingProject=setWorkingProject(newProject);//sets current working project
        let displayedObjects=projectDOMRefresh(todoProjectObjects(todoArray,workingProject),'todoContainer',todoContent);
        makeTaskEditable(todoContent,displayedObjects);
        console.log(workingProject);
    });
}

//Date buttons
todayTodoBtn.onclick=()=>{
    projectDOMRefresh(todoDateObjects(todoArray,todayDate),'todoContainer',todoContent); //displays todos for this week.
}

weekTodoBtn.onclick=()=>{
    let thisWeekProjects=[];
    for(let i=0;i<7;i++){
        let dateToFilter=add(todayDate,{days:i});
        thisWeekProjects=thisWeekProjects.concat(todoDateObjects(todoArray,dateToFilter));
    }
    let displayedObjects=projectDOMRefresh(thisWeekProjects,'todoContainer',todoContent);
    makeTaskEditable(todoContent,displayedObjects);
}