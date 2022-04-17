
function todoConstructor(todoTitle,todoDetails,todoDueDate,project){
    return {todoTitle, todoDetails, todoDueDate,project};
}

//sets the global variable to the current working project
function setWorkingProject(currentProject){
    return currentProject.id;
}

//Returns an array composed of objects that match the given project

function todoProjectObjects(todoArray,currentWorkingProject){
    let filteredArray=[];
    todoArray.forEach(element => {
        if(element.project == currentWorkingProject)
            filteredArray.push(element);
    });
    return filteredArray;
}
export {todoConstructor,setWorkingProject,todoProjectObjects};