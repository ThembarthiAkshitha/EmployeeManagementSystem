import { Component } from "react";
import './index.css'

class AddingNewDepartment extends Component{
    state = {
        deptName: '',
        deptDesc: '',
        editEmpId: null,
    }
    onDepatName = event => {
        this.setState({
            deptName: event.target.value
        })
    }
    onDeptDesc = event => {
        this.setState({
            deptDesc: event.target.value
        })
    }
    
    onAddingDeptDetails = async event => {
        event.preventDefault()
        const {onAddingDept} = this.props
        const jwtToken = sessionStorage.getItem('jwt_token')
        const {deptName, deptDesc} = this.state
        const newDept = {
            deptName, deptDesc
        }
        const options = {
            method: "POST",
            headers: {
                "Content-type" : "application/json",
                Authorization: `Bearer ${jwtToken}`
            },
            body: JSON.stringify(newDept)
        }
        const url = `http://localhost:3001/departments`
        const response = await fetch(url, options)
        if (response.ok === true){
            onAddingDept()
        }
    }
    render(){
        const { deptName, deptDesc} = this.state
        return (
            <div className='add-new-department-form-container'>
                <h1 className='add-new-department-main-heading'>Add New Department</h1>
                <form onSubmit={this.onAddingDeptDetails} className='add-new-department-form'> 
                    <label>Department Name</label><br />
                    <input type="text" onChange={this.onDepatName} className='input-element' value={deptName}/><br />
                    <label>Department Description</label> <br />
                    <textarea rows='100' cols='50' className='input-element' onChange={this.onDeptDesc} value={deptDesc}/><br />
                    <button className="admin-department-add-emp-btn" type="submit">Add Department</button>
                </form>
            </div>
        )
    }
}


export default AddingNewDepartment