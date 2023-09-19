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
            case "viewAllRoles": 
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

function viewAllDepartments() {
    connection.query("SELECT * FROM department", function(err, res) {
        err ? console.log(err) : console.table(res), startTracker();
    });
}
function viewAllRoles() {
    connection.query("SELECT * FROM role", function(err, res) {
        err ? console.log(err) : console.table(res), startTracker();
    });

}
function viewAllEmployees() {
    connection.query("SELECT * FROM employee", function(err, res) {
        err ? console.log(err) : console.table(res), startTracker();
    });
}
function addADepartment(){
    inquirer.prompt([
        {
            type: "input", 
            name: "addDepartment", 
            message: "What Deparment would you like to add?",
        },
    ]).then((userResponse)=>{
        
        let departmentName = userResponse.addDepartment
        connection.query(`INSERT INTO department (department_name) VALUES ("${departmentName}")`,
        function(error, response){
            error? console.log(error): viewAllDepartments(),startTracker();
        }
        )
    })
}
function addARole(){
    connection.query("SELECT * FROM department", function (error, response){
       if (error){
        console.log(error)
        startTracker()
       }
       const departmentList = response.map((department)=>({
        value: department.id,
        name: department.department_name,

       }))
       inquirer.prompt([
        {
            type: "input",
            name:"addRole",
            message:"What role do you want to add?",

        },
        {
            type: "input",
            name:"salary",
            message:"What is the salary for the role?",

        },
        {
            type: "list",
            name: "departmentId",
            message: "What department does this role belong to?",
            choices: departmentList, 

        },
       ]).then ((userResponse)=>{
        let departmentId = userResponse.departmentId;
        let roleTitle = userResponse.addRole;
        let roleSalary= userResponse.salary;
        connection.query(`INSERT INTO role (title, salary, department_id)
         VALUES ("${roleTitle}", "${roleSalary}","${departmentId}")`,
         function (error, response){
            error? console.log(error):viewAllRoles(),startTracker();
         }
         )
       })
    })
}
function addAnEmployee(){
    connection.query("SELECT * FROM department", function (error, response){
        if (error){
            console.log(error)
            startTracker();
        }
        const roleList = response.map((role)=>({
            value: role.id,
            name: role.title,

        }))
        inquirer.prompt([
            {
                type: "input",
                name:"firstName",
                message:"What is their first name?",
    
            },
            {
                type: "input",
                name:"lastName",
                message:"What is their last name?",
    
            },  
        ]).then((userResponse)=>{
            let roleId=userResponse.roleId;
            let employeeFirst=userResponse.firstName;
            let employeeLast =userResponse.lastName;
            connection.query(`INSERT INTO employee (first_name,last_name, role_id)
            VALUES ("${employeeFirst}","${employeeLast}","${roleId}")
            `,
            function (error,response){
                error? console.log(error):viewAllEmployees(),startTracker()
            }
            )
        })
    })

       
        

}
startTracker()
    
