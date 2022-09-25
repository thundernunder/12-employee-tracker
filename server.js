const inquirer = require('inquirer');
const mysql = require('mysql');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

const db = mysql.createConnection(
    {
      host: process.env.host,
      // MySQL username,
      user: process.env.user,
      // MySQL password
      password: process.env.password,
      database: 'employeeTracker_db'
    },
    console.log(`Connected to the employeeTracker_db database.`),
    employeeTime()
);

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
        case 'view all departments': viewAllDepartments(); break;

        case 'view all roles': viewAllRoles();
        break;

        case 'view all employees': viewAllEmployees(); 
        break;

        case 'add a department': addDepartment(); 
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


  