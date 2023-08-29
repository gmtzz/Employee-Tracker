// dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cfonts = require('cfonts');
require("console.table")

// creates connection to sql database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Disney101!',
    database: 'employee_db'
});

//connect sql server and sql db

connection.connect(function(err){

    // error if there is an issue when connecting 
    err? console.log(err) : console.log("connected"), 
    displayLogo()

   

});
const fontConfig={
    font: "3d",
    align: "center",
    colors:["blue","magenta"],
    background: "black",
    letterSpacing: 1,
    lineHeight: 1,
    fontSize: "small",

}

function displayLogo(){
    cfonts.say("Emplo\nyee\nTra\ncker",fontConfig)
    console.log("-------------------------------------------------------")

}
function startTracker (){
    
    inquirer.prompt([
        {
            type: "list",
            name: "startingOptions",
            message: "What would you like to do?",
            choices: ["viewalldepartments",
            "viewAllRoles",
            "view_all_employees",
            "add_a_department",
            "add_a_role",
            "add_an_employee",
            "update_employee",
            "quit"
        ]
        }
    ])
    .then ((userAnswers)=>{
        console.log("selected:"  +userAnswers.startingOptions)
        let choices = userAnswers.startingOptions
        switch(choices){
            case "viewalldepartments": 
            viewAllDepartments();
            break;
            case "view_all_roles": 
            viewAllRoles();
            break;
            case "view_all_employees": 
            viewAllEmployees();
            break;
            case "add_a_department": 
            addADepartment();
            break;
            case "add_a_role": 
            addARole();
            break;
            case "add_an_employee": 
            addAnEmployee();
            break;
            case "update_employee": 
            updateEmployee();
            break;
            case "quit": 
            quit();
            break;
        

        }
    })

}
function viewAllDepartments(){
    connection.query("SELECT * FROM department", function(err,res){
        err ? console.log(err): console.table(res), startTracker()
    })


}
startTracker()