const inquirer = require('inquirer');
const {returnTitleOnly,getIdOfValue,returnIdwithNameDisplayed,inquirerFormatEmpOpt} = require('./helpers.js');
const Question = require('./question.js');
const Employee = require('./employee.js');
const Role = require('./role.js');
const fetch = require("node-fetch");
const { response } = require('express');

const mainMenu =  () =>{
    inquirer.prompt(
            [
                new Question(
                          'command',
                          'list',
                          'What would you like to do?',
                          [
                            'View all employees',
                            'add employees',
                            'update employee role',
                            'view all roles',
                            'add role',
                            'view all departments',
                            'add department',
                            'quit'
                          ]
                          )
            ]
        )
        .then(async (response)=>{
            const {command} = response;
            switch (command) {
                case 'View all employees':
                    //view
                    fetch(('http://localhost:5000/api/employees') , {
                        method: 'GET'
                      })
                        .then((res) => res.json())
                        .then((data) => {
                            console.table(data);
                        })
                        .then(()=>mainMenu());
                    break;
                case 'add employees':
                    let titleDataForId;
                    //set of questions
                    fetch(('http://localhost:5000/api/roles/titles') , {
                        method: 'GET'
                      })
                        .then((res) => res.json())
                        .then((data) => {
                            //console.table(data);
                            titleDataForId = data;
                            let te = [...returnTitleOnly(data)];
                            return te;
                        })
                        .then(async (listOfRoles)=>{
                             const bodyRequest = await empMenu(listOfRoles);
                            // let ck = bodyRequest;
                            //call empmenu here
                            // console.info(bodyRequest);
                            return bodyRequest;
                        })
                        .then(async (bodyRequest)=>{
                            // console.log(JSON.stringify(bodyRequest));
                            // console.log(titleDataForId);
                            const testOK = titleDataForId.filter((item)=>{
                                // console.info(item);
                                if (item.title === bodyRequest.role) {
                                    return true;
                                } else {
                                    return false;
                                }
                            });
                            //getIdOfValue(bodyRequest.role);
                            bodyRequest.role_id = testOK[0].id;
                            fetch(('http://localhost:5000/api/employees') , {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                              },
                            body: JSON.stringify(bodyRequest),
                          }).then(()=>mainMenu())
                            // console.info(bodyRequest);
                        });
                        
                         
                    break;
                case 'update employee role':
                    let checksome;
                    let updating;
                    //set of questions
                    fetch(('http://localhost:5000/api/employees') , {
                        method: 'GET'
                      }).then((res) => res.json())
                      .then(async (data) =>{

                        // console.log(data);
                        const empToChange = await empOpt(inquirerFormatEmpOpt(data));
                        console.log(empToChange);
                        updating = empToChange;
                        return empToChange;

                      })                      
                      .then(()=>{
                        fetch(('http://localhost:5000/api/roles/titles') , {
                            method: 'GET'
                          })
                            .then((res) => res.json())
                            .then((data) => {
                                //console.table(data);
                                checksome = data;
                                let te = [...returnIdwithNameDisplayed(data)];
                                return te;
                            })
                            .then(async (listOfRoles)=>{
                                 const bodyRequest = await empRole(listOfRoles);
                                // let ck = bodyRequest;
                                //call empmenu here
                                // console.info(bodyRequest);
                                return bodyRequest;
                            })
                            .then(async (bodyRequest)=>{
                                // console.log(JSON.stringify(bodyRequest));
                                // console.log(titleDataForId);
                                // const testOK = checksome.filter((item)=>{
                                //     // console.info(item);
                                //     if (item.title === bodyRequest.role) {
                                //         return true;
                                //     } else {
                                //         return false;
                                //     }
                                // });
                                //getIdOfValue(bodyRequest.role);
                                // bodyRequest.role_id = testOK[0].id;
                                
                                fetch((`http://localhost:5000/api/employees/${updating.id}`) , {
                                method: 'PUT',
                                headers: {
                                    "Content-Type": "application/json",
                                  },
                                body: JSON.stringify(bodyRequest),
                              }).then(()=>mainMenu())
                                // console.info(bodyRequest);
                            })


                      });
                    
                    
                    break;
                case 'view all roles':
                    fetch(('http://localhost:5000/api/roles') , {
                        method: 'GET'
                      })
                        .then((res) => res.json())
                        .then((data) => {
                            console.table(data);
                        })
                        .then(()=>mainMenu());
                    break;
                case 'add role':
                    fetch(('http://localhost:5000/api/departments'),{method:'GET'})
                    .then((res)=>res.json())
                    .then(async (data)=>{
                        
                        const bodyRequestRole = await roleAdd(data);
                        console.log(bodyRequestRole);
                        //need to switch to id
                        const filterData = data.filter((item)=>{
                            // console.info(item);
                            if (item.name === bodyRequestRole.department_id) {
                                return true;
                            } else {
                                return false;
                            }
                        });
                        bodyRequestRole.department_id = `${filterData[0].id}`


                        fetch(('http://localhost:5000/api/roles'),{
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                              },
                            body: JSON.stringify(bodyRequestRole),
                        }).then(()=>mainMenu())
                    })                    
                    break;
                case 'view all departments':
                    fetch(('http://localhost:5000/api/departments') , {
                        method: 'GET'
                      })
                        .then((res) => res.json())
                        .then((data) => {
                            console.table(data);
                        })
                        .then(()=>mainMenu());
                    break;
                case 'add department':
                    
                    const bodyRequestDep = await departmentAdd();
                    // console.log(bodyRequestDep);
                    fetch(('http://localhost:5000/api/departments'),{
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                      },
                    body: JSON.stringify(bodyRequestDep),
                }).then(()=>mainMenu())
                    break;
                case 'quit':
                    
                    break;
                default:
                    break;
            }
        });
}

const empMenu = async (listOfRoles) =>{
    let toSend;
    
    await inquirer.prompt(
        [
        new Question('first_name','input','What is the employee\'s first name? '),
        new Question('last_name','input','What is the employee\'s last name? '),
        new Question('role','list','What is the employee\'s role? ',[...listOfRoles]
                           
        ),

        ]
    ).then((response)=>{
        toSend = response;
    });
    return toSend;
}
const empOpt = async (dataToPass)=>{
    let toSend;
    
    await inquirer.prompt(
        [new Question('id','list','Who is the employee? ',[...dataToPass]                           
        ),

        ]
    ).then((response)=>{
        toSend = response;
    });
    return toSend;
}
const empRole = async (dataToPass)=>{
    let toSend;
    
    await inquirer.prompt(
        [new Question('role_id','list','What is the employee\'s role? ',[...dataToPass]                           
        ),

        ]
    ).then((response)=>{
        toSend = response;
    });
    return toSend;
}
const roleAdd = async (roles)=>{
    let toSend;
    
    await inquirer.prompt(
        [
            new Question('title','input','What is the Role\'s Title? '),
            new Question('salary','input','What is the Salary for this Role?'),            
            new Question('department_id','list', 'What is the Department of this Role?',[...roles] ),
            //new Question('test','list','doit',[{name:"test1",value:"1"}])
            
    
            ]
    ).then((response)=>{
        toSend = response;
    })
    return toSend;
}
const departmentAdd = async ()=>{
    let toSend;

    await inquirer.prompt(
        [
            new Question('name','input','What is the Name of this Department? '),
           
    
            ]
    ).then((response)=>{
        toSend = response;
    })
    return toSend;
}



module.exports = mainMenu;