import {Component} from 'react' 
import './index.css'

class UpdateEmployeeDetails extends Component{
    state = {
        employeeDetails : [],
        updateNewEmpForm: false, 
        showEmp: true,
        name: '',
        email:'',
        dob: '',
        gender: 'Male',
        designation: 'IT',
        role: 'Employee',
        salary: '',
        department: 'IT',
    }
    componentDidMount(){
        this.getEmployeeDetails()
    }

    getEmployeeDetails = async () => {
        const {id} = this.props
        const jwtToken = sessionStorage.getItem('jwt_token')
        const options = {
            method: "GET",
            credentials: "include",
            headers: {Authorization: `Bearer ${jwtToken}`}
        }
        const url = `http://localhost:3001/employees/${id}`
        const response = await fetch(url, options)
        const data = await response.json() 
        console.log("Details that need to be update: ", data.employeeDetails)
        this.setState({
            name : data.employeeDetails.empname,
            email: data.employeeDetails.email,
            dob: data.employeeDetails.dob,
            gender: data.employeeDetails.gender,
            designation: data.employeeDetails.designation,
            role: data.employeeDetails.role,
            salary: data.employeeDetails.salary,
            department: data.employeeDetails.department
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
    onSalary = event => {
        this.setState({
            salary: event.target.value
        })
    }
    onUpdatingDetails = async event => {
        const {onUpdateEmployee, id} = this.props
        event.preventDefault()
        const {name, email,dob, gender, designation, role, salary, department} = this.state
        const updatedUser = {
            name, email, dob, gender, designation, role, salary, department
        }
        console.log("Sending:", updatedUser)
        const jwtToken = sessionStorage.getItem('jwt_token')
        const options = {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-type" : "application/json",
                Authorization: `Bearer ${jwtToken}`
            },
            body: JSON.stringify(updatedUser)
        }
        const url = `http://localhost:3001/employees/${id}`
        const response = await fetch(url, options)
        if (response.ok === true){
            onUpdateEmployee()
        }
    }
    render(){
        const {name, email,dob, gender, designation, role, salary, department} = this.state
        return(
            <div className='update-department-form-container'>
                <h1 className='update-department-main-heading'>Update Employee</h1>
                <form onSubmit={this.onUpdatingDetails}> 
                    <div className='update-department-form'>
                        <div>
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
                            </select><br />
                        </div>
                        <div>
                            <label>Gender</label> <br />
                            <select className='input-element' onChange={this.onGender} value={gender}>
                                <option>Male</option>
                                <option>Female</option>
                            </select><br />
                            <label>Role</label> <br />
                            <select className='input-element' onChange={this.onRole} value={role}>
                                <option>Admin</option>
                                <option>Employee</option>
                            </select> <br />
                            <label>Salary</label> <br />
                            <input type="number" className='input-element' onChange={this.onSalary} value={salary}/> <br />
                            <label>Department</label> <br />
                            <select className='input-element' onChange={this.onDepartment} value={department} >
                                <option>IT</option>
                                <option>Database</option>
                                <option>Logistics</option>
                            </select>
                        </div>
                    </div>
                    <button className="admin-employee-update-btn" type="submit">Update Employee</button>
                </form>
            </div>
        )
    }
}

export default UpdateEmployeeDetails



