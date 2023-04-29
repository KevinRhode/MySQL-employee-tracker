const inquirer = require('inquirer');
const {returnTitleOnly,returnIdwithNameDisplayed,inquirerFormatEmpOpt,inquirerFormatDepartments,retForDepart} = require('./helpers.js');
const Question = require('./question.js');
const fetch = require("node-fetch");

const mainMenu =  () =>{
    inquirer.prompt(
            [
                new Question(
                          'command',
                          'list',
                          'What would you like to do?',
                          [
                            'view all employees',
                            'add employees',
                            'update employee role',
                            'view all roles',
                            'add role',
                            'view all departments',
                            'add department',                            
                            'quit',
                            'view department budgets',
                            'delete data',
                            'update employee manager',
                            'view employees by manager',
                            'view employees by department',
                            // 'print me'
                          ]
                          )
            ]
        )
        .then(async (response)=>{
            const {command} = response;
            switch (command) {
                case 'view all employees':
                    //view
                    fetch(('http://localhost:5000/api/employees/view') , {method: 'GET'})
                        .then((res) => res.json())
                        .then((data) => {console.table(data);//printMe(data);
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
                                return bodyRequest;
                            })
                            .then(async (bodyRequest)=>{                              
                                
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
                case 'update employee manager':
                    let checksome2;
                    let updating2;
                    //set of questions
                    fetch(('http://localhost:5000/api/employees') , {
                        method: 'GET'
                      }).then((res) => res.json())
                      .then(async (data) =>{
                        let uemBody = {manager_id:''};
                        // console.log(data);
                        const empToChange = await empOpt(inquirerFormatEmpOpt(data));
                        console.log(empToChange);
                        updating2 = empToChange;
                        
                        //remove emp, you cant be your own boss
                        const nono = data.filter(obj=> obj.id != empToChange.id);
                        //select the new manager and return their id
                        const manager = await empMan(inquirerFormatEmpOpt(nono));
                        uemBody.manager_id = manager.id;
                        fetch((`http://localhost:5000/api/employees/${empToChange.id}`) , {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json",
                              },
                            body: JSON.stringify(uemBody),
                          }).then(()=>mainMenu())
                      
                      
                        });
                      

                      
                    

                    break;
                case 'view all roles':
                    fetch(('http://localhost:5000/api/roles') , {
                        method: 'GET'
                      })
                        .then((res) => res.json())
                        .then((data) => {
                            console.table(data);
                            //printMe(data);
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
                    process.exit(0);
                    break;
                case 'view department budgets':
                    fetch(('http://localhost:5000/api/departments') , {
                        method: 'GET'
                      })
                        .then((res) => res.json())
                        .then(async (data) => {
                            //now do stuff for the departments
                            const something = await budgetView(data);
                            //console.log(`http://localhost:5000/api/departments/budgets/${something.name}`);
                            fetch((`http://localhost:5000/api/departments/budgets/${something.name}`) , {
                                    method: 'GET'
                                }).then((res)=>res.json()).then((data)=>{
                                    console.log('');
                                    console.table(data);
                                }).then(()=>mainMenu());
                            
                        });
                    break;
                // case 'print me':
                //     printMe();
                //     break;
                case 'DELETE DATA':
                    const {id,table} = await deleteWild();
                    // const {status,message} = await deleteWildCard();
                    fetch((`http://localhost:5000/api/delete/${table}/${id}`) , {
                        method: 'DELETE',
                      })
                        .then((res) => res.json())
                        .then((data) => {
                            
                            console.table(data);
                            //printMe(data);
                        })
                        .then(()=>mainMenu());
                    
                    // console.log(`id:${id} table:${table} status:${status} message:${message}`);
                    //mainMenu();
                    break;
                case 'view employees by manager':
                    //select all emp that are managers
                    fetch(('http://localhost:5000/api/employees/managers') , {method: 'GET'})
                    .then((res) => res.json())
                    .then(async (data) => {
                        const man_id = await managerViewEmp(data)
                        // console.log(man_id);
                        // console.table(data);//printMe(data);
                        // :id:type
                        
                        
                        fetch((`http://localhost:5000/api/employees/view${man_id.name}manager`) , {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({"id":`${man_id.name}`,"type":"manager"})})
                        .then((res) => res.json()).then((data)=>{console.table(data);mainMenu();});


                    });
                break;
                case 'view employees by department':
                    //select all emp that are managers
                    fetch(('http://localhost:5000/api/departments') , {method: 'GET'})
                    .then((res) => res.json())
                    .then(async (data) => {
                        const departmentyeah = await departmentViewEmp(data)
                        // console.log(man_id);
                        // console.table(data);//printMe(data);
                        // :id:type
                        
                        
                        fetch((`http://localhost:5000/api/employees/view${departmentyeah.name}department`) , {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({"id":`${departmentyeah.name}`,"type":"department"})})
                        .then((res) => res.json()).then((data)=>{console.table(data);mainMenu();});


                    });
                break;
                
                
                
                default:
                    mainMenu();
                    break;
            }
        })
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
const empMan = async (dataToPass)=>{
    let toSend;
    
    await inquirer.prompt(
        [new Question('id','list','Who their new manager? ',[...dataToPass]                           
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
const budgetView = async (data)=>{
    let toSend;

    await inquirer.prompt(
        [
            new Question('name','list','What is the Name of the Department? ',[...inquirerFormatDepartments(data)]),
           
    
            ]
    ).then((response)=>{
        toSend = response;
        //console.log(toSend);
    })
    return toSend; 
}
const deleteWild = async ()=>{
    let toSend;

    await inquirer.prompt(
        [
            new Question('table','list','Do you wish to delete Employees, Roles, or Departments? ',['employee','role','department']),
            new Question('id', 'input','what is the id? view alls have id presented')          
    
            ]
    ).then((response)=>{
        toSend = response;
        console.log(toSend);
    })
    return toSend; 
}
const managerViewEmp = async (data)=>{
    let toSend;

    await inquirer.prompt(
        [
            new Question('name','list','What is the Name of the Manager? ',[...inquirerFormatEmpOpt(data)]),
           
    
            ]
    ).then((response)=>{
        toSend = response;
        //console.log(toSend);
    })
    return toSend; 
}
const departmentViewEmp = async (data)=>{
    let toSend;

    await inquirer.prompt(
        [
            new Question('name','list','What is the Name of the Department? ',[...retForDepart(data)]),
           
    
            ]
    ).then((response)=>{
        toSend = response;
        //console.log(toSend);
    })
    return toSend; 
}

module.exports = mainMenu;