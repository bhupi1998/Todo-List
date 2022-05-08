import {compareAsc,parseISO} from 'date-fns';
import { el } from 'date-fns/locale';

function todoConstructor(todoTitle,todoDetails,todoDueDate,project,todoId){
    todoDueDate=JSON.stringify(parseISO(todoDueDate)); //converts the string to a date object
    todoId=`taskId-${todoId}`;
    return {todoTitle, todoDetails, todoDueDate,project,todoId};
}

function projectConstructor(projectId,projectName){
    return {projectId,projectName};
}
//sets the global variable to the current working project
function setWorkingProject(currentProject){
    return currentProject.id;
}

//Returns an array composed of objects that match the given project

function todoProjectObjects(todoArray,currentWorkingProject){
    let filteredArray=[];
    todoArray.forEach(element => {
        if(element==null)return;
        if(element.project == currentWorkingProject)
            filteredArray.push(element);
    });
    return filteredArray;
}

function todoDateObjects(todoArray,dateToFilter){
    let filteredArray=[];
    todoArray.forEach(element => {
        if(element==null)return;
        let DueDate=parseISO(element.todoDueDate);
        if(compareAsc(DueDate,dateToFilter)==0)
            filteredArray.push(element);
    });
    return filteredArray;
}

function saveToLocalStorage(){
    localStorage.setItem('numberOfTodo',taskIdGlobal);
    localStorage.setItem('projectId',projectIdGlobal);
    //everytime there is a change, save it to local storage
    todoArray.forEach(function(todoObject,index){
        todoObject.todoDueDate=JSON.stringify(todoObject.todoDueDate); //convert date object to string.
        localStorage.setItem(`todo-${index}`,JSON.stringify(todoObject));
    });
    todoProject.forEach(function(project,index){
        localStorage.setItem(`project-${index}`,JSON.stringify(project));
    });
}

function restoreLocalStorage(){
    taskIdGlobal=localStorage.getItem('numberOfTodo');
    projectIdGlobal=localStorage.getItem('projectId');
    for(let i=0;i<taskIdGlobal;i++){
        let objectToParse=localStorage.getItem(`todo-${i}`);
        objectToParse=JSON.parse(objectToParse);
        //objectToParse.todoDueDate=parseISO(objectToParse.todoDueDate); //need to convert date back into date object
        todoArray.push(objectToParse);
    }
    for(let l=0;l<projectIdGlobal;l++){
        let objectToParse=localStorage.getItem(`project-${l}`);
        todoProject.push(JSON.parse(objectToParse));
    }
}
//Need to reselect each element as the DOM got refreshed.
//displayed object array is passed.
function makeTaskEditable(parentDiv,objectArray){
    objectArray.forEach(function(element){
        const taskNode=parentDiv.querySelector(`#${element.todoId}`);
        const taskNodeTitle=taskNode.querySelector(`#${element.todoId}-title`);
        const taskNodeDetail=taskNode.querySelector(`#${element.todoId}-detail`);
        const taskNodeDueDate=taskNode.querySelector(`#${element.todoId}-dueDate`);
        const taskNodeDeleteBtn=taskNode.querySelector(`#${element.todoId}-deleteBtn`);
        [taskNodeDetail,taskNodeDueDate,taskNodeTitle].forEach(function(element2){
            element2.addEventListener('input',()=>{
                let elementId=element2.id;
                let elementArrayPosition=(elementId.match('[0-9]+'))[0]; //.match returns an array
                let elementTaskInputType=(elementId.match('-[t][a-z]+|-[d][a-zA-Z]+'))[0];
                elementTaskInputType=elementTaskInputType.slice(1,elementTaskInputType.length);
                switch(elementTaskInputType){
                    case 'title':
                        todoArray[elementArrayPosition].todoTitle=element2.textContent;
                        break;
                    case 'detail':
                        todoArray[elementArrayPosition].todoDetails=element2.textContent;
                        break;
                    case 'dueDate':
                        todoArray[elementArrayPosition].todoDueDate=element2.textContent;
                        break;
                    default:return;
                }
                saveToLocalStorage();
                })
            });
            taskNodeDeleteBtn.addEventListener('click',function(){
                let elementArrayPosition=((taskNodeDeleteBtn.id).match('[0-9]+'))[0]; //.match returns an array
                todoArray[elementArrayPosition]=null;//clears the array position
                const elementToRemove=document.getElementById(`taskId-${elementArrayPosition}`);
                elementToRemove.remove();//removes element from DOM
                saveToLocalStorage();
                console.log(localStorage);
            });
        });
    }
export {todoConstructor,setWorkingProject,todoProjectObjects,todoDateObjects,makeTaskEditable,saveToLocalStorage,projectConstructor,restoreLocalStorage};

