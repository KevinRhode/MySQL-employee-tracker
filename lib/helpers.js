const returnTitleOnly=function(array){
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        const {title} = array[i];
        newArray.push(title);
    }
    return newArray;
}
const getIdOfValue = function(data){
    console.info(data);
    return 1;
}
//for role
const returnIdwithNameDisplayed = function (array){
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        const {id,title} = array[i];
        newArray.push({name:`${title}`,value:`${id}` });
    }
    return newArray;
}
//middleware for spread into inquirer choices list
const inquirerFormatEmpOpt = function (array){
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        const {id,first_name, last_name} = array[i];
        if (first_name != null) {
            newArray.push({name:`${first_name} ${last_name}`,value:`${id}` });
        }
        
    }
    return newArray;
}
//middleware for spread into inquirer choices list
const inquirerFormatDepartments = function (array){
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        const {id,name} = array[i];
        newArray.push({name:`${name}`,value:`${id}` });
    }
    return newArray;
}
module.exports = {returnTitleOnly,getIdOfValue,returnIdwithNameDisplayed,inquirerFormatEmpOpt,inquirerFormatDepartments}