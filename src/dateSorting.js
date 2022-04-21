//fns add function. Returns date with the amounts added
//
import {add} from 'date-fns';

//need a function that returns an array of objects that match a given date
//no need to use this.
function taskDateFilter(taskArray,dateToCheck){
    let matchedArray=[];
    taskArray.foreach(function(taskObject){
        if(taskObject.todoDueDate == dateToCheck){
            matchedArray.push(taskObject);
        }
    });
    return matchedArray;
}
export {};