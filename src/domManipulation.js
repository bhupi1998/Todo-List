const todoContent=document.querySelector('.todo-content');
const addTaskButton=todoContent.querySelector('.addTask');

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

export {addTodoDiv,showTaskForm,hideTaskForm};