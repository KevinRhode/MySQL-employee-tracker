const Question = require('./lib/question.js');
//const {allEmp} = require('./lib/prepSQL.js')
const inquirer = require('inquirer');
const mainMenu = require('./lib/main.js');
const api = require('./routes/index.js');

const express = require('express');
// Import and require mysql2
// const mysql = require('mysql2');

const PORT = process.env.PORT || 5000;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/',api);



// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  //console.log(`Server running on port ${PORT}`);
});

const init = async ()=>{
   mainMenu();
}

// const prompt = inquirer.createPromptModule();
// let runProgram = true
// while(runProgram){
//   await prompt([
//     new Question(
//       'command',
//       'list',
//       'What would you like to do?',
//       [
//         'View all employees',
//         'add employees',
//         'update employee role',
//         'view all roles',
//         'add role',
//         'view all departments',
//         'add department',
//         'quit'
//       ]
//       ),
//   ],answers);
// }





// let runProgram = true;
// while (runProgram) {
//   inquirer
//   .prompt([
//     new Question(
//       'command',
//       'list',
//       'What would you like to do?',
//       [
//         'View all employees',
//         'add employees',
//         'update employee role',
//         'view all roles',
//         'add role',
//         'view all departments',
//         'add department',
//         'quit'
//       ]
//       ),
//   ])
//   .then((response)=>{
//     console.log(response);
//     //return response;
// })
//   .catch((err)=>console.log(err));
// }
