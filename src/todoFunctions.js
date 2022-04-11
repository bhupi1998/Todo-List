
function todoConstructor(todoTitle,todoDetails,todoDueDate,project){
    return {todoTitle, todoDetails, todoDueDate,project};
}

//sets the global variable to the current working project
function setWorkingProject(currentProject){
    return currentProject.id;
}
export {todoConstructor,setWorkingProject};