
const mainMenu = require('./lib/main.js');
const {empLogo} = require('./lib/printmydata.js')
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
   empLogo();
   mainMenu();
}

init();