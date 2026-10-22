const express = require('express'); 
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const PORT = 3001;                

const app = express();  
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))      
app.use(cookieParser())      
app.use(express.json())

let db = null
const dbPath = path.join(__dirname, 'ems.db')

const createDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        }) 
        app.listen(PORT, () => {
            console.log(`Server is listening on http://localhost:${PORT}`);
        });
    }
    catch (e) {
        console.log(`DB Error: ${e.message}`)
        process.exit(1)
    }
}

app.post('/login', async (req, res) => {
    const {username, password} = req.body
    const selectingQuery = `
     select * from employee where email=?;
    `
    console.log("The details that i am getting from the frontend are: ", req.body)
    const dbUser = await db.get(selectingQuery, [username])
    console.log(dbUser)
    if (dbUser === undefined){
        res.status(400)
        res.send({error_msg:"User doesn't exist"})
    }
    else {
        const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
        if (isPasswordMatched){
            let payload = {username: dbUser.email}
            let jwtToken = jwt.sign(payload, 'my_secret_key', {expiresIn: '7d'})
            res.status(200)
            res.send({jwt_token: jwtToken})
        }
        else{
            res.status(400)
            res.send({error_msg:"Invalid credentials"})
        }
    }

})

// Define a simple route
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        return res.status(401).send("Invalid JWT Token")
    }
    const jwtToken = authHeader.split(' ')[1]
    if (!jwtToken){
        return res.status(401).send("Invalid JWT Token")
    }
    jwt.verify(jwtToken, "my_secret_key", (error, payload) => {
        if (error) {
            return res.status(401).send("Invalid JWT Token")
        }
        req.username = payload.username
        next()
    })
}

app.get('/user',authenticateToken, async (request, response) => {
    const employee = await db.get(
        `SELECT empid, empname, email, dob, gender, designation, role, salary, department
         FROM employee
         WHERE email = ?`,
        [request.username]
    )
    if (employee === undefined) {
        return response.status(404).send("Employee not found")
    }
    response.send({userData: employee})
})

app.get('/employees', async (req, res) => {
    const selectEmployeesQuery = `
      select * from employee where role='Employee';
    `
    const data = await db.all(selectEmployeesQuery)
    res.status(200)
    res.send({employeeData: data})
})

app.post('/employees', async (req, res) => {
    const {empid, name, email, dob, gender, designation, role, salary, password, department} = req.body
    console.log("Received new user: ", req.body)
    const hashedPassword = await bcrypt.hash(password, 10)
    const insertingQuery = `
        insert into employee (empid, empname, email, dob, gender, designation, role, salary, password, department) values 
        (?,?,?,?,?,?,?,?,?,?);
    `
    await db.run(insertingQuery, [empid, name, email, dob, gender, designation, role, salary, hashedPassword, department]) 
    res.status(200)
    res.send("Employee Added")
})

app.get('/employees/:id', authenticateToken, async (req, res) => {
    const {id} = req.params
    const employee = await db.get(
        `SELECT empid, empname, email, dob, gender, designation, role, salary, department
         FROM employee
         WHERE empid = ?`,
        [id]
    )
    if (employee === undefined) {
        res.status(404)
        res.send("Employee not found")
    }
    else{
        res.status(200)
        res.send({employeeDetails: employee})
    }
})

app.put('/employees/:id', authenticateToken, async (req, res) => {
    const {id} = req.params
    const { name, email, dob, gender, designation, role, salary, department} = req.body 
    console.log("Updated detalis: ", req.body)
    const updateQuery = `
        UPDATE employee
        SET 
            empname = ?,
            email = ?,
            dob = ?,
            gender = ?,
            designation = ?,
            role = ?,
            salary = ?,
            department = ?
        WHERE empid = ?
    `
    const result = await db.run(
        updateQuery,
        [
            name,
            email,
            dob,
            gender,
            designation,
            role,
            salary,
            department,
            id
        ]
    )
    if (result.changes === 0) {
        res.status(404)
        res.send("Employee not found")
    }
    else{
        res.status(200)
        res.send("Employee Details Updated")
    }
})

app.get('/departments', authenticateToken, async (req, res) => {
    const selectDepartmentsQuery = `
      select * from department;
    `
    const data = await db.all(selectDepartmentsQuery)
    console.log("departments api called the data is: ", data)
    res.status(200)
    res.send({departmentData: data})
})

app.get('/departments/:id', authenticateToken, async (req, res) => {
    const {id} = req.params
    const department = await db.get(
        `SELECT dept_id, dept_name, dept_desc
         FROM department
         WHERE dept_id = ?`,
        [id]
    )
    if (department === undefined) {
        res.status(404)
        res.send("Department not found")
    }
    else{
        res.status(200)
        res.send({departmentDetails: department})
    }
})



app.post('/departments', async (req, res) => {
    const {deptName, deptDesc} = req.body
    console.log("Received new department: ", req.body)
    const insertingQuery = `
        insert into department (dept_name, dept_desc) values 
        (?,?);
    `
    await db.run(insertingQuery, [deptName, deptDesc]) 
    res.status(200)
    res.send("Department Added")
})


app.put('/departments/:id', authenticateToken, async (req, res) => {
    const {id} = req.params
    const {deptName, deptDesc} = req.body

    const updateQuery = `
        UPDATE department
        SET
            dept_name = ?,
            dept_desc = ?
        WHERE dept_id = ?
    `

    const result = await db.run(
        updateQuery,
        [deptName, deptDesc, id]
    )

    if (result.changes === 0) {
        return res.status(404).send("Department not found")
    }

    res.status(200).send("Department Updated")
})

app.delete('/departments/:id', async (req, res) => {
    const {id} = req.params
    console.log("Received new department: ", req.body)
    const insertingQuery = `
        delete from department where dept_id =  
        (?);
    `
    await db.run(insertingQuery, [id]) 
    res.status(200)
    res.send("Department Deleted")
})


app.get('/employees/departments/:department', async (req, res) => {
    const {department} =  req.params
    const selectEmployeesByDepartmentQuery = `
      select * from employee where role='Employee' and department=?;
    `
    const data = await db.all(selectEmployeesByDepartmentQuery, [department])
    res.status(200)
    res.send({employeeData: data})
})

app.post('/salaries', async (req, res) => {
    const {department, basicSalary, deduction, employeeId, payDate, allowances} = req.body
    console.log("Received new user: ", req.body)
    const total = Number(basicSalary) + Number(allowances) - Number(deduction)
    const insertingQuery = `
        insert into salary (emp_id, salary, allowances, deduction, total, pay_date) values 
        (?,?,?,?,?,?);
    `
    await db.run(insertingQuery, [employeeId, basicSalary, allowances,deduction, total, payDate]) 
    res.status(200)
    res.send("Salary Added")
})

app.get('/salaries/employee/:id', authenticateToken, async (req, res) => {
    const {id} = req.params
    const salaryDetailsOfEmp = await db.all(
        `SELECT emp_id, salary, allowances, deduction, total, pay_date
         FROM salary
         WHERE emp_id = ?
         ORDER BY pay_date DESC`,
        [id]
    )
    if (salaryDetailsOfEmp === undefined) {
        res.status(404)
        res.send("Salary Details not found")
    }
    else{
        res.status(200)
        console.log("Salary Details of Emp: ", salaryDetailsOfEmp)
        res.send({salaryDetailsOfEmp })
    }
})

app.put('/change-password/',authenticateToken ,async (req, res) => {
    const { oldPassword, newPassword} = req.body
    console.log("These all are in backend:")
    const selectingQuery = `
    select password from employee where email = ?;
    `
    const employee = await db.get(selectingQuery, [req.username])
    if (employee ===  undefined){
        console.log("employee not found")
        res.status(400)

        res.send('Employee Not Found')
    }
    // const isPasswordMatched = bcrypt.verify(oldPassword, employee.password)
    if (oldPassword == employee.password){
        console.log("old password doesn't matched")
        res.status(400)
        res.send("Old Password doesn't matched")
    }
    else{
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        const updatePasswordQuery = `
           update employee set password = ? where email = ?
        `
        await db.run(updatePasswordQuery, [hashedPassword, req.username])
        res.status(200)
        console.log("updated query exeution finished")
        res.send("Password Updated Successfully")
    }
})

app.get('/leaves/my-leaves', authenticateToken, async (req, res) => {
    const employee = await db.get(
            `SELECT empid
             FROM employee
             WHERE email = ?`,
            [req.username]
    )
    
    if (employee === undefined) {
        res.status(404)
        res.send("Employee not found")
    }
    else{
        const {empid} = employee
        const leavesList = await db.all(
            `SELECT srno, leavetype, from_date, to_date, apply_date, description, status
            FROM leaves
            WHERE empid = ?`,
            [empid]
        )
        res.status(200)
        res.send({employeeLeaveDetails: leavesList})
    }
})

app.post('/leaves',authenticateToken, async (req, res) => {
    try{
        console.log("The leave details i got from frontend: ",req.body)
        const {leaveType, fromDate, toDate,description} = req.body 
        if (!leaveType || !fromDate || !toDate) {
            return res.status(400).send({
                error_msg: 'Leave type, from date, and to date are required'
            })
        }
        if (toDate < fromDate) {
            return res.status(400).send({
                error_msg: 'To date cannot be earlier than from date'
            })
        }
        const employee = await db.get(
                `SELECT empid
                FROM employee
                WHERE email = ?`,
                [req.username]
        )
        if (employee === undefined){
            res.status(400)
            res.send("Employee not found")
            return
        }
        const {empid} = employee
        const applyDate = new Date().toISOString().split('T')[0]
        const insertingQuery = `
            insert into leaves (leavetype, from_date, to_date, apply_date, description, status, empid) values 
            (?,?,?,?,?,?,?);
        `
        await db.run(insertingQuery, [leaveType, fromDate, toDate, applyDate, description, 'Pending', empid]) 
        res.status(200)
        res.send("Leave Added")
    }catch (error) {
        console.error('Error adding leave:', error)
        return res.status(500).send({
        error_msg: 'Failed to add leave'
        })
    }
})

app.get('/leaves', async (req, res) => {
    const selectLeavesQuery = `
      select employee.empid as empid, 
      employee.empname as empname,
      leaves.leavetype as leavetype,
      leaves.srno as srno,
      employee.department as department,
      leaves.from_date as from_date,
      leaves.to_date as to_date,
      CAST(
            julianday(leaves.to_date) -
            julianday(leaves.from_date) + 1
            AS INTEGER
      ) AS no_of_days,
      leaves.status as status
      from leaves
      join employee on employee.empid = leaves.empid;
    `
    const data = await db.all(selectLeavesQuery)
    console.log(data)
    res.status(200)
    res.send({employeeLeavesData: data})
})

app.get('/leaves/:id', authenticateToken, async (req, res) => {
    try{ 
        const {id} = req.params
        const selectLeaveQuery = `
            select employee.empid as empid, 
            employee.empname as empname,
            employee.gender as gender,
            leaves.leavetype as leavetype,
            employee.department as department,
            leaves.from_date as from_date,
            leaves.to_date as to_date,
            leaves.description as description,
            leaves.status as status
            from leaves
            join employee on employee.empid = leaves.empid
            Where leaves.srno = ?;
        `
        const dashboardDetails = await db.get(
            selectLeaveQuery,
            [id]
        )
        if (dashboardDetails === undefined) {
            res.status(404)
            res.send("Leave details not found")
        }
        else{
            res.status(200)
            res.send({dashboardDetails: dashboardDetails})
        }
    }catch (error) {
        console.error('Error fetching leave details:', error)
        res.status(500).send({
            error_msg: 'Failed to fetch leave details'
        })
    }
})

app.put('/leaves/:id', authenticateToken, async (req, res) => {
    const {id} = req.params
    const { status} = req.body 
    console.log("Updated status detalis: ", req.body)
    const updateQuery = `
        UPDATE leaves
        SET 
            status = ?
        WHERE srno = ?
    `
    const result = await db.run(
        updateQuery,
        [
            status,
            id
        ]
    )
    if (result.changes === 0) {
        res.status(404)
        res.send("Employee not found")
    }
    else{
        res.status(200)
        res.send("Leave Details Updated")
    }
})

app.get('/leaves/employee/:id', authenticateToken, async (req, res) => {
    const {id} = req.params
    try {
        const leaveDetailsOfEmp = await db.all(
            `SELECT from_date, to_date, leavetype, description, apply_date, status
            FROM leaves
            WHERE empid = ?
            ORDER BY apply_date DESC`,
            [id]
        )
        if (leaveDetailsOfEmp === undefined) {
            res.status(404)
            res.send("Salary Details not found")
        }
        else{
            res.status(200)
            console.log("Leave Details of Emp: ", leaveDetailsOfEmp)
            res.send({leaveDetailsOfEmp })
        }
    }catch (error) {
        console.error('Error fetching employee leave details:', error)
        return res.status(500).send({
            error_msg: 'Failed to fetch employee leave details'
        })
    }
})


app.get('/dashboard', authenticateToken, async (req, res) => {
    try{ 
        const dashboardQuery = `
          select
            (select count(*) from employee) as employeeCount,
            (select count(*) from department) as departmentCount,
            (select COALESCE(SUM(total), 0) from salary) as monthlyPay,
            (select count(*) from leaves) as leavesCount,
            (select count(*) from leaves where status like 'Pending') as leavesPendingCount,
            (select count(*) from leaves where status like 'Accepted') as leavesApprovedCount,
            (select count(*) from leaves where status like 'Rejected') as leavesRejectedCount
        `
        const dashboardDetails = await db.get(dashboardQuery)
        console.log("Dashboard Details: ", dashboardDetails)
        if (dashboardDetails === undefined) {
            res.status(404)
            res.send("Dashboard details not found")
        }
        else{
            res.status(200)
            res.send({dashboardDetails: dashboardDetails})
        }
    }catch (error) {
        console.error('Dashboard query error:', error.message)
        return res.status(500).json({
        error_msg: error.message
    })}
})

createDBAndServer()
module.exports = app


