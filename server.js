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
//cfonts config
const fontConfig={
    font: "3d",
    align: "center",
    colors:["blue","magenta"],
    background: "black",
    letterSpacing: 1,
    lineHeight: 1,
    fontSize: "small",

}
//function to display logo
function displayLogo(){
    cfonts.say("Emplo\nyee\nTra\ncker",fontConfig)
    console.log("-------------------------------------------------------")

}
//start app
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
//View all departments function
function viewAllDepartments() {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, results) => {
        if (err) {
        console.log('Error:', err);
        } else {
        console.log('All Departments:');
        console.table(results), startTracker();
    }
});   
}
//View all roles function
function viewAllRoles() {
    const query = 'SELECT * FROM role';
    connection.query(query, (err, results) => {
        if (err) {
        console.log('Error:', err);
        } else {
        console.log('All Roles:');
        console.table(results), startTracker();
    }
});   
}

//view all employees function
function viewAllEmployees() {
    const query = 'SELECT * FROM employee';
    connection.query(query, (err, results) => {
        if (err) {
        console.log('Error:', err);
        } else {
        console.log('All Employees:');
        console.table(results), startTracker();
    }
});   
}

// add a dept function
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
//add a role function
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
//add an employee function
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
            
            {
                type: "list",
                name: "roleId",
                message: "Select the employee's role:",
                choices: roleList, 
            },

        ]).then((userResponse)=>{
            let roleId=roleResponse.roleId;
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
//Update an employee function
function updateEmployee() {

    const employeeList = response.map((role)=>({
        value: employeeId,
        name: employee.employeeFirst, //employee.employeeLast,

    }))
    inquirer.prompt([
        {
            type:"list",
            name: "employeeId",
            message: "Select the employee to update:",
            choices: employeeList
        },
        {
            type: "input",
            name: "newFirstName",
            message: "Enter updated first name:",
        },
        {
            type: "input",
            name: "newLastName",
            message: "Enter updated last name:",
        },
        {
            type: "list",
            name: "newRoleId",
            message: "Please choose new role for the employee",
            choices: "",
        },

        ]).then((userResponse) => {
           
            const employeeId = userResponse.employeeId;
            const newFirstName = userResponse.newFirstName;
            const newLastName = userResponse.newLastName;
            const newRoleId = userResponse.newRoleId;

          
            const query = `
                UPDATE employee
                SET first_name = "${newFirstName}", last_name = "${newLastName}", role_id = "${newRoleId}"
                WHERE id = "${employeeId}"
            `;

            connection.query(query, [newFirstName, newLastName, newRoleId, employeeId], (err, results) => {
                if (err) {
                 console.log('Error:', err);
                } else {
                    console.log('Update Successful.');
                    viewAllEmployees(); 
                    startTracker();
                }
            
        
        });
    });
}

startTracker()
    
