const inquirer = require('inquirer');
const mysql = require('mysql');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.password,
    database: 'employeeTrackerDB',
});