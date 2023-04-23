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
module.exports = {returnTitleOnly,getIdOfValue}