import { Component } from "react";
import './index.css'

class AddingNewEmpolyee extends Component{
    state = {
        empid:'',
        name: '',
        email:'',
        dob: '',
        gender: 'Male',
        designation: 'IT',
        role: 'Employee',
        salary: '',
        password: '',
        department: null,
        editEmpId: null,
        departments: []
    }
    componentDidMount(){
        this.getDepartments()
    }

    getDepartments = async () => {
        const jwtToken = sessionStorage.getItem('jwt_token')
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        }
        const url = 'http://localhost:3001/departments'
        const response = await fetch(url, options) 
        if (response.ok === true){
            const data = await response.json()
            this.setState({
                departments: data.departmentData,
                department: data.departmentData[0].dept_name
            })
        }
    }

    onEmpId = event =>{
        this.setState({
            empid: event.target.value
        })
    }
    
    onName = event => {
        this.setState({
            name: event.target.value
        })
    }
    onEmail = event => {
        this.setState({
            email: event.target.value
        })
    }
    onDate = event => {
        this.setState({
            dob: event.target.value
        })
    }
    onGender = event => {
        this.setState({
            gender: event.target.value
        })
    }
    onDepartment = event => {
        this.setState({
            department: event.target.value
        })
    }
    onRole = event => {
        this.setState({
            role: event.target.value
        })
    }
    onDesignation = event => {
        this.setState({
            designation: event.target.value
        })
    }
    onPassword = event => {
        this.setState({
            password: event.target.value
        })
    }
    onSalary = event => {
        this.setState({
            salary: event.target.value
        })
    }
    onAddingDetails = async event => {
        const jwtToken = sessionStorage.get('jwt_token')
        const {onAddingEmployee} = this.props
        event.preventDefault()
        const {empid, name, email,dob, gender, designation, role, salary, department, password} = this.state
        const newUser = {
            empid, name, email, dob, gender, designation, role, salary, password, department
        }
        const options = {
            method: "POST",
            headers: {
                "Content-type" : "application/json",
                Authorization : `Bearer ${jwtToken}`
            },
            body: JSON.stringify(newUser)
        }
        const url = `http://localhost:3001/employees`
        const response = await fetch(url, options)
        if (response.ok === true){
            onAddingEmployee()
        }
    }
    render(){
        const { empid, role, department, designation, gender, name, email, dob, password, salary, departments} = this.state
        console.log("Departments: ", departments)
        return (
            <div className='add-new-employee-form-container'>
                <h1 className='add-new-emp-main-heading'>Add New Employee</h1>
                <form onSubmit={this.onAddingDetails}> 
                    <div className='add-new-emp-form'>
                        <div>
                            <label>Employee Id</label><br />
                            <input type="text" onChange={this.onEmpId} className='input-element' value={empid}/><br />
                            <label>Name</label> <br />
                            <input type="text" className='input-element' onChange={this.onName} value={name}/><br />
                            <label>Email</label> <br />
                            <input type="email" className='input-element' onChange={this.onEmail} value={email}/><br />
                            <label>Date of birth</label> <br />
                            <input type="date" className='input-element' onChange={this.onDate} value={dob}/><br />
                            <label>Designation</label> <br />
                            <select className='input-element' onChange={this.onDesignation} value={designation}>
                                <option>IT</option>
                                <option>Software</option>
                                <option>Developer</option>
                            </select>
                        </div>
                        <div>
                            <label>Gender</label> <br />
                            <select className='input-element' onChange={this.onGender} value={gender}>
                                <option>Male</option>
                                <option>Female</option>
                            </select><br/>
                            <label>Role</label> <br />
                            <select className='input-element' onChange={this.onRole} value={role}>
                                <option>Admin</option>
                                <option>Employee</option>
                            </select> <br />
                            <label>Salary</label> <br />
                            <input type="number" className='input-element' onChange={this.onSalary} value={salary}/> <br />
                            <label>Password</label> <br />
                            <input type="password" className='input-element' onChange={this.onPassword} value={password}/> <br />
                            <label>Department</label> <br />
                            <select className='input-element' onChange={this.onDepartment} value={department} >
                                {departments.map(each => <option key={each.dept_id}>{each.dept_name}</option>)}
                            </select>
                        </div>
                    </div>
                    <button className="admin-employee-add-emp-btn" type="submit">Add Employee</button>
                </form>
            </div>
        )
    }
}

export default AddingNewEmpolyee