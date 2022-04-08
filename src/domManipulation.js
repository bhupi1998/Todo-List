const todoContent=document.querySelector('.todo-content');

function addTodoDiv(todoObject){
    const todoContainer=document.createElement('div');
    const todoTitle=document.createElement('h1');
    const todoDetail=document.createElement('p');
    const todoDueDate=document.createElement('p');
    
    todoTitle.innerText=todoObject.todoTitle;
    todoDetail.innerText=todoObject.todoDetails;
    todoDueDate.innerText=document.todoDueDate;

    todoContainer.append(todoTitle,todoDetail,todoDueDate);
    todoContent.append(todoContainer);
}

export {addTodoDiv};