import { Component } from "react";
import './index.css'

class UpdateDepartmentDetails extends Component{
    state = {
        departmentDetails : [],
        updateNewDeptForm: false, 
        showDept: true,
        deptName:'',
        deptDesc: ''
    }
    componentDidMount(){
        this.getDepartmentDetails()
    }

    getDepartmentDetails = async () => {
        const {id} = this.props
        const jwtToken = sessionStorage.getItem('jwt_token')
        const options = {
            method: "GET",
            credentials: "include",
            headers: {Authorization: `Bearer ${jwtToken}`}
        }
        const url = `http://localhost:3001/departments/${id}`
        const response = await fetch(url, options)
        const data = await response.json() 
        console.log("Details that need to be update: ", data.departmentDetails)
        this.setState({
            deptName : data.departmentDetails.dept_name,
            deptDesc: data.departmentDetails.dept_desc,
        })
    }
    onDeptName = event => {
        this.setState({
            deptName: event.target.value
        })
    }
    onDeptDesc = event => {
        this.setState({
            deptDesc: event.target.value
        })
    }
    
    onUpdatingDetails = async event => {
        const {onUpdateDept, id} = this.props
        event.preventDefault()
        const {deptName, deptDesc} = this.state
        const updatedDepartment = {
            deptName, deptDesc
        }
        console.log("Sending:", updatedDepartment)
        const jwtToken = sessionStorage.getItem('jwt_token')
        const options = {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-type" : "application/json",
                Authorization: `Bearer ${jwtToken}`
            },
            body: JSON.stringify(updatedDepartment)
        }
        const url = `http://localhost:3001/departments/${id}`
        const response = await fetch(url, options)
        if (response.ok === true){
            onUpdateDept()
        }
    }
    render(){
        const {deptName, deptDesc} = this.state

        return (
            <div className="update-department-form-container">
                <h1 className="update-department-main-heading">
                    Update Department
                </h1>
                <form
                    onSubmit={this.onUpdatingDetails}
                    className="update-department-form"
                >
                    <label>Department Name</label><br />
                    <input
                        type="text"
                        className="input-element"
                        onChange={this.onDeptName}
                        value={deptName}
                    />
                    <br />
                    <label>Department Description</label><br />
                    <textarea
                        rows="5"
                        cols="50"
                        className="input-element"
                        onChange={this.onDeptDesc}
                        value={deptDesc}
                    />
                    <br />
                    <button
                        className="admin-department-update-btn"
                        type="submit"
                    >
                        Update Department
                    </button>
                </form>
            </div>
        )
    }
}

export default UpdateDepartmentDetails