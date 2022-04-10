import './style.css';
import {todoConstructor} from './todoFunctions.js';
import {addTodoDiv,showTaskForm} from './domManipulation.js';
import {addTask} from './inputUserData.js'

const todoContent=document.querySelector('.todo-content');
const addTaskButton=todoContent.querySelector('.addTask');

let todoArray = [];
const test = todoConstructor('hello','bro',25);

addTaskButton.onclick=() => {
    showTaskForm();
};
//When button is clicked, show input form
//user inputs..
//when Add is pressed, take all the user data and return an object(using todoconstructor function)
//close input form
//add object to todoArray and display it

addTodoDiv(test);
