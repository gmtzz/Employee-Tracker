// dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');

// creates connection to sql database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: 'Disney101!',
    database: 'employee_db'
});

//connect sql server and sql db

connection.connect(function(err){

    // error if there is an issue when connecting 
    if (err) throw err;

   

});