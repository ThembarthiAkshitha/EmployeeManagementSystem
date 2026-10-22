import { Component } from "react";
import './index.css'

class AdminAddingSalary extends Component{
    state = {
        department: '',
        basicSalary: '',
        deduction: '',
        employeeId: '',
        allowances: '',
        payDate: '',
        departments: [],
        employees: []
    }
    componentDidMount(){
        this.getDepartments()
    }
    getEmployeesByDepartment= async department => {
        const jwtToken = sessionStorage.getItem('jwt_token')
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        }
        const url = `http://localhost:3001/employees/departments/${department}`
        const response = await fetch(url, options) 
        if (response.ok === true){
            const data = await response.json()
            this.setState({
                employees: data.employeeData,
                employeeId:  data.employeeData.length > 0
                ? data.employeeData[0].empid
                : ''
            })
        }
    }
    getDepartments= async () => {
        const jwtToken = sessionStorage.getItem('jwt_token')
        const options = {
            method: 'GET',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        }
        const url = 'http://localhost:3001/departments'
        const response = await fetch(url, options) 
        if (response.ok === true){
            const data = await response.json()
            const departments = data.departmentData
            this.setState({
                departments,
                department: departments.length > 0 ? departments[0].dept_name : ''
            })
            if (departments.length > 0) {
                await this.getEmployeesByDepartment(departments[0].dept_name)
            }
        }
    }

    onBasicSalary = event => {
        this.setState({
            basicSalary: event.target.value
        })
    }
    onEmployee = event => {
        this.setState({
            employeeId: event.target.value
        })
    }
    onDeduction = event => {
        this.setState({
            deduction: event.target.value
        })
    }
    onAllowances = event => {
        this.setState({
            allowances: event.target.value
        })
    }
    onDepartment = event => {
        // This is a problem because setState() is asynchronous. department may still contain the old value.
        const department = event.target.value
        this.setState({
            department
        })
        this.getEmployeesByDepartment(department)
    }
    
    onPayDate = event => {
        this.setState({
            payDate: event.target.value
        })
    } 


    onAddingSalaryDetails = async event => {
        event.preventDefault()
        const {department, basicSalary, allowances, deduction, employeeId, payDate} = this.state
        const newUser = {
            department, basicSalary, allowances, deduction, employeeId, payDate
        }
        const jwtToken = sessionStorage.getItem('jwt_token')
        const options = {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type" : "application/json",
                Authorization: `Bearer ${jwtToken}`
            },
            body: JSON.stringify(newUser)
        }
        const url = `http://localhost:3001/salaries`
        const response = await fetch(url, options)
        if (response.ok === true){
            this.setState({
                basicSalary: '',
                payDate: '',
                allowances: '',
                deduction: '',
                employeeId: '',
            })
        }
    }
    render(){
        const { department, departments, basicSalary, deduction, employeeId, allowances, payDate, employees} = this.state
        console.log("Departments: ", departments)
        return (
            <div className='admin-add-salary-form-container'>
                <h1 className='admin-add-salary-main-heading'>Add Salary</h1>
                <form onSubmit={this.onAddingSalaryDetails}> 
                    <div className='admin-add-new-salary-form'>
                        <div>
                            <label>Department</label><br />
                            <select value={department} className='input-element' onChange={this.onDepartment}>
                                {departments.map(each =><option key={each.dept_id} value={each.dept_name}>{each.dept_name}</option>)}
                            </select><br />
                            <label>Basic Salary</label> <br />
                            <input type="number" className='input-element' onChange={this.onBasicSalary} value={basicSalary}/><br />
                            <label>Deduction</label> <br />
                            <input type="number" className='input-element' onChange={this.onDeduction} value={deduction}/><br />
                        </div>
                        <div>
                            <label>Employee Id</label> <br />
                            <select className='input-element' onChange={this.onEmployee} value={employeeId}>
                                {employees.map(each => <option key={each.empid} value={each.empid}>{each.empid}</option>)}
                            </select><br/>
                            <label>Allowances</label> <br />
                            <input type="number" className='input-element' onChange={this.onAllowances} value={allowances}/> <br />
                            <label>Pay Date</label> <br />
                            <input type="date" className='input-element' onChange={this.onPayDate} value={payDate}/> <br />
                        </div>
                    </div>
                    <button className="admin-add-salary-btn" type="submit">Add Salary</button>
                </form>
            </div>
        )
    }
}

export default AdminAddingSalary