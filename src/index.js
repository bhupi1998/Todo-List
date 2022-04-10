import './style.css';
import {todoConstructor} from './todoFunctions.js';
import {addTodoDiv,showTaskForm,hideTaskForm} from './domManipulation.js';
import {addTask} from './handleUserInputData.js'

const todoContent=document.querySelector('.todo-content');

//form********************************************
const addTaskButton=todoContent.querySelector('.addTask');
const newTaskForm=todoContent.querySelector('#newTaskForm');
//Form inputs*******************************************
const newTaskTitle=newTaskForm.querySelector('#newTaskForm-taskTitle');
const newTaskDetail=newTaskForm.querySelector('#newTaskForm-taskDetail');
const newTaskDate=newTaskForm.querySelector('#newTaskForm-taskDueDate');
//************************************************ */
const formNewTaskBtn=newTaskForm.querySelector(".newTaskForm-addTaskBtn");//confirms adding new task
const formCancelTaskBtn=newTaskForm.querySelector(".newTaskForm-cancelTaskBtn");//confirms adding new task
//*********************************************** */
let todoArray = []; //contains all arrays.

addTaskButton.onclick=() => {
    showTaskForm();
};
/*New task form event listeners*****************************/

newTaskForm.onsubmit=(e)=>{
    e.preventDefault(); ///prevents refresh of page
    hideTaskForm();//hides form
    const task = todoConstructor(newTaskTitle.value,newTaskDetail.value,newTaskDate.value);
    addTodoDiv(task); //adds a div in the DOM
    todoArray.push(task);
    newTaskForm.reset(); //resets form
}
/***********************************************************/



