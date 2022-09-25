require('dotenv').config();
console.log(process.env);
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;

const db = mysql.createConnection(
    {
      host: process.env.DB_HOST,
      // MySQL username,
      user: process.env.DB_USER,
      // MySQL password
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the employeeTracker_db database.`)
);

db.connect((err) => {
    if (err) throw err;
    console.log(`Connected`);
    employeeTime();
});

employeeTime = () => {
inquirer.prompt([
    {
        name: 'firstQuestion', 
        type: 'list', 
        message: 'Thank you for choosing Employee Tracker. Where should we start?',  
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role, add an employee', 'update an employee role']
    }
]).then((response) => {
    switch(response.firstQuestion) {
        case 'view all departments': 
            viewAllDepartments(); 
            break;

        case 'view all roles': 
            viewAllRoles();
            break;

        case 'view all employees': 
            viewAllEmployees(); 
            break;

        case 'add a department': 
            addDepartment(); 
            break;

        case 'add a role': 
            addRole();
            break;

        case 'add an employee':
            addEmployee();
            break;

        case 'update employee role': 
            updateEmployeeRole();
            break;
    }});
}

viewAllDepartments = () => {
    db.query(`SELECT * FROM department;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        employeeTime();
    })
};



  