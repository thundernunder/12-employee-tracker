const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
require('dotenv').config();

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
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
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

viewAllRoles = () => {
    db.query(`SELECT role.role_id, role.title, role.salary, department.department_name, department.department_id FROM role JOIN department ON role.department_id = department.department_id ORDER BY role.role_id ASC;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        employeeTime();
    })
};

viewAllEmployees = () => {
    db.query(`SELECT e.employee_id, e.first_name, e.last_name, role.title, department.department_name, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager FROM employee m RIGHT JOIN employee e ON e.manager_id = m.employee_id JOIN role ON e.role_id = role.role_id JOIN department ON department.department_id = role.department_id ORDER BY e.employee_id ASC;`, (err, res) => {
        if (err) throw err;
        console.table(res);
        employeeTime();
    })
};

addDepartment = () => {
    inquirer.prompt([
        {
        name: 'newDepartment',
        type: 'input',
        message: 'What is your new department called?'   
        }
    ]).then((response) => {
        db.query(`INSERT INTO department SET ?`, 
        {
            department_name: response.newDepartment,
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${response.newDepartment} successfully added department!`);
            employeeTime();
        })
    })
};

addEmployee = () => {
    db.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        let roles = res.map(role => ({name: role.title, value: role.role_id }));
        db.query(`SELECT * FROM employee;`, (err, res) => {
            if (err) throw err;
            let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id}));
            inquirer.prompt([
                {
                    name: 'firstName',
                    type: 'input',
                    message: `What is the new employee's first name?`
                },
                {
                    name: 'lastName',
                    type: 'input',
                    message: `What is the new employee's last name?`
                },
                {
                    name: 'role',
                    type: 'list',
                    message: 'title?',
                    choices: roles
                },
                {
                    name: 'manager',
                    type: 'list',
                    message: `Who is the new employee's manager?`,
                    choices: employees
                }
            ]).then((response) => {
                db.query(`INSERT INTO employee SET ?`, 
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: response.role,
                    manager_id: response.manager,
                }, 
                (err, res) => {
                    if (err) throw err;
                })
                db.query(`INSERT INTO role SET ?`, 
                {
                    department_id: response.dept,
                }, 
                (err, res) => {
                    if (err) throw err;
                    console.log(`New employee successfully added to database!`);
                    employeeTime();
                })
            })
        })
    })
};

addRole = () => {
    db.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        let roles = res.map(role => ({name: role.title, value: role.role_id }));
        db.query(`SELECT * FROM employee;`, (err, res) => {
            if (err) throw err;
            let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id }));
            inquirer.prompt([
                {
                    name: 'employee',
                    type: 'list',
                    message: 'Which employee would you like to update the role for?',
                    choices: employees
                },
                {
                    name: 'newRole',
                    type: 'list',
                    message: 'What should the employee\'s new role be?',
                    choices: roles
                },
            ]).then((response) => {
                db.query(`UPDATE employee SET ? WHERE ?`, 
                [
                    {
                        role_id: response.newRole,
                    },
                    {
                        employee_id: response.employee,
                    },
                ], 
                (err, res) => {
                    if (err) throw err;
                    console.log(`\n Successfully updated employee's role in the database! \n`);
                    employeeTime();
                })
            })
        })
    })
};

updateEmployeeRole = () => {
    db.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        let roles = res.map(role => ({name: role.title, value: role.role_id }));
        db.query(`SELECT * FROM employee;`, (err, res) => {
            if (err) throw err;
            let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id }));
            inquirer.prompt([
                {
                    name: 'employee',
                    type: 'list',
                    message: 'Which employee would you like to update the role for?',
                    choices: employees
                },
                {
                    name: 'newRole',
                    type: 'list',
                    message: `What should the employee's new role be?`,
                    choices: roles
                },
            ]).then((response) => {
                db.query(`UPDATE employee SET ? WHERE ?`, 
                [
                    {
                        role_id: response.newRole,
                    },
                    {
                        employee_id: response.employee,
                    },
                ], 
                (err, res) => {
                    if (err) throw err;
                    console.log(`Successfully updated employee's role in the database!`);
                    employeeTime();
                })
            })
        })
    })
}





  