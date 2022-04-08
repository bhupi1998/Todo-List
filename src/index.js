import './style.css';
import {todoConstructor} from './todoFunctions.js';
import {addTodoDiv} from './domManipulation.js';

let todoArray = [];
const test = todoConstructor('hello','bro',25);
addTodoDiv(test);
