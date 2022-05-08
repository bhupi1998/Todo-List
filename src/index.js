import './style.css';
import {todoConstructor,setWorkingProject,todoProjectObjects,todoDateObjects,makeTaskEditable,saveToLocalStorage,projectConstructor,restoreLocalStorage} from './todoFunctions.js';
import {addTodoDiv,showTaskForm,hideTaskForm,showNewProjectMenu,hideNewProjectMenu,addNewProjectDOM,projectDOMRefresh} from './domManipulation.js';
import {} from './dateSorting.js'

import {compareAsc,parse,parseISO,add} from 'date-fns';

const todoContent=document.querySelector('.todo-content');
const todoContentContainer=document.querySelector('.todo-content-container');

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
let todayDate=new Date(); //today's date
todayDate.setHours(0,0,0,0); //sets the time to 0. 


function initialSetUp(){
    const newProject=sidebarProjectContainer.querySelector(`#defaultProject`);
    workingProject=setWorkingProject(newProject);//sets current active project
    newProject.addEventListener('click',()=>{
        workingProject=setWorkingProject(newProject);//sets current working project
        let displayedObjects=projectDOMRefresh(todoProjectObjects(todoArray,workingProject),'todoContainer',todoContentContainer);
        makeTaskEditable(todoContentContainer,displayedObjects);
    });
    restoreLocalStorage(); 

    if(taskIdGlobal==null)
        taskIdGlobal=0;
    if(projectIdGlobal==null)
        projectIdGlobal=0;
    //show tasks for default project
    let displayedObjects=projectDOMRefresh(todoProjectObjects(todoArray,workingProject),'todoContainer',todoContentContainer);
    makeTaskEditable(todoContentContainer,displayedObjects);

    //show all projects
    todoProject.forEach(function(element,index){
        let projectId=addNewProjectDOM(element.projectId,projectList,element.projectName);
        const newProject=sidebarProjectContainer.querySelector(`#${projectId}`);
        newProject.addEventListener('click',()=>{
            workingProject=setWorkingProject(newProject);//sets current working project
            let displayedObjects=projectDOMRefresh(todoProjectObjects(todoArray,workingProject),'todoContainer',todoContentContainer);
            makeTaskEditable(todoContentContainer,displayedObjects);
        });
    });
}

initialSetUp();

addTaskButton.onclick=() => {
    showTaskForm(todoContentContainer,addTaskButton);
};
/*New task form event listeners*****************************/

newTaskForm.onsubmit=(e)=>{
    e.preventDefault(); ///prevents refresh of page
    hideTaskForm(todoContentContainer,addTaskButton);//hides form
    const task = todoConstructor(newTaskTitle.value,newTaskDetail.value,newTaskDate.value,workingProject,taskIdGlobal);
    taskIdGlobal++;

    addTodoDiv(todoContentContainer,task); //adds a div in the DOM   
    let taskArray=[task];
    makeTaskEditable(todoContentContainer,taskArray);

    todoArray.push(task);
    saveToLocalStorage();
    newTaskForm.reset(); //resets form

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
    todoProject.push(projectConstructor(projectId,newProjectInputField.value));
    projectIdGlobal++;
    newProjectInputField.value='';
    const newProject=sidebarProjectContainer.querySelector(`#${projectId}`);
    workingProject=setWorkingProject(newProject);//sets current active project
    let displayedObjects=projectDOMRefresh(todoProjectObjects(todoArray,workingProject),'todoContainer',todoContentContainer);
    makeTaskEditable(todoContentContainer,displayedObjects);
    newProject.addEventListener('click',()=>{
        workingProject=setWorkingProject(newProject);//sets current working project
        let displayedObjects=projectDOMRefresh(todoProjectObjects(todoArray,workingProject),'todoContainer',todoContentContainer);
        makeTaskEditable(todoContentContainer,displayedObjects);
    });
    saveToLocalStorage();
}

//Date buttons
todayTodoBtn.onclick=()=>{
    //adding class to display active list
    const allActiveProjects=document.querySelectorAll('.activeProject');
    allActiveProjects.forEach(function(element){
        element.classList.remove('activeProject');
    });
    todayTodoBtn.classList.add(`activeProject`);

    projectDOMRefresh(todoDateObjects(todoArray,todayDate),'todoContainer',todoContentContainer); //displays todos for this week.
}

weekTodoBtn.onclick=()=>{
    //adding class to display active list
    const allActiveProjects=document.querySelectorAll('.activeProject');
    allActiveProjects.forEach(function(element){
        element.classList.remove('activeProject');
    });
    weekTodoBtn.classList.add(`activeProject`);

    let thisWeekProjects=[];
    for(let i=0;i<7;i++){
        let dateToFilter=add(todayDate,{days:i});
        thisWeekProjects=thisWeekProjects.concat(todoDateObjects(todoArray,dateToFilter));
    }
    let displayedObjects=projectDOMRefresh(thisWeekProjects,'todoContainer',todoContentContainer);
    makeTaskEditable(todoContentContainer,displayedObjects);
}