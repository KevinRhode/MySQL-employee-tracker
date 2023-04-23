const inquirer = require('inquirer');
const Question = require('./question.js');

const mainMenu = () =>{
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
        .then((response)=>{
            switch (response) {
                case 'View all employees':
                    //view
                    fetch('/api/employees', {
                        method: 'GET'
                      })
                        .then((res) => res.json())
                        .then((data) => {
                            console.table(data);
                            console.info(console.table(data));
                        });
                    break;
                case 'add employees':
                    //set of questions
                    break;
                case 'update employee role':
                    //set of quesitons
                    break;
                case 'view all roles':
                    
                    break;
                case 'add role':
                    
                    break;
                case 'view all departments':
                    
                    break;
                case 'add department':
                    
                    break;
                case 'quit':
                    
                    break;
                default:
                    break;
            }
        });
}

module.exports = mainMenu;