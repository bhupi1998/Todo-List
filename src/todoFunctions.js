import {compareAsc,parseISO} from 'date-fns';

function todoConstructor(todoTitle,todoDetails,todoDueDate,project,todoId){
    todoDueDate=parseISO(todoDueDate); //converts the string to a date object
    todoId=`taskId-${todoId}`;
    return {todoTitle, todoDetails, todoDueDate,project,todoId};
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

function todoDateObjects(todoArray,dateToFilter){
    let filteredArray=[];
    todoArray.forEach(element => {
        if(compareAsc(element.todoDueDate,dateToFilter)==0)
            filteredArray.push(element);
    });
    return filteredArray;
}
export {todoConstructor,setWorkingProject,todoProjectObjects,todoDateObjects};