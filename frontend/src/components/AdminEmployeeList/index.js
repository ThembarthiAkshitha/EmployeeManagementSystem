import {Component} from 'react'
import './index.css'
import UpdateEmployeeDetails from '../UpdateEmployeeDetails'
import AddingNewEmpolyee from '../AddingNewEmployee'
import AdminSalaryDetailsOfEmp from '../AdminSalaryDetailsOfEmp'
import AdminEmployeeProfile from '../AdminEmployeeProfile'
import AdminLeaveDetailsOfEmp from '../AdminLeaveDetailsOfEmp'

class AdminEmployeeList extends Component{
    state = {
        employeeList : [],
        addNewEmpForm: false, 
        showEmp: true,
        editEmpForm: false,
        editEmpId: null,
        salaryDetailsOfEmp: false,
        salaryDetailsEmpId: null,
        showDetailsOfEmpId: null,
        detailsEmpComp: false,
        leaveDetailsEmpId: null,
        leaveDetailsOfEmp: false,
        searchingByName: ''
    }
    componentDidMount(){
        this.getEmployeeDetails()
    }
    getEmployeeDetails = async () => {
        const jwtToken = sessionStorage.getItem('jwt_token')
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        }
        const url = `http://localhost:3001/employees`
        const response = await fetch(url, options)
        const data = await response.json() 
        this.setState({
            employeeList: data.employeeData || []
        })
    }
    onAddNewBtn = () => {
        this.setState({
            addNewEmpForm : true,
            showEmp: false
        })
    }
    onEditEmpDetails = id => {
        this.setState({
            editEmpId: id,
            editEmpForm: true,
            showEmp: false
        })
    }
    onEmployeeDetails = id => {
        this.setState({
            showDetailsOfEmpId: id,
            detailsEmpComp: true,
            showEmp: false
        })
    }
    onBackOfEmployeeDetails = async () => {
        this.setState({
            detailsEmpComp: false,
            showEmp: true
        })
    }
    onSalaryDetails = id => {
        this.setState({
            salaryDetailsEmpId: id,
            salaryDetailsOfEmp: true,
            showEmp: false
        })
    }
    onBackOfSalaryDetails = async () => {
        this.setState({
            salaryDetailsOfEmp: false,
            showEmp: true
        })
    }
    onUpdateEmployee = async () => {
        await this.getEmployeeDetails()
            this.setState({
                editEmpForm: false,
                showEmp: true,
            })
    }
    
    onAddingEmployee = async () => {
        await this.getEmployeeDetails()
            this.setState({
                addNewEmpForm: false,
                showEmp: true,
            })
    }
    onEmployeeLeaveDetails = id => {
        this.setState({
            leaveDetailsEmpId: id,
            leaveDetailsOfEmp: true,
            showEmp: false
        })
    }
    onBackOfLeaveDetails = async () => {
        this.setState({
            leaveDetailsOfEmp: false,
            showEmp: true
        })
    }
    onSearchByName = event => {
        this.setState({
            searchingByName: event.target.value
        })
    }
    render(){
        const {employeeList, addNewEmpForm, showEmp, editEmpForm, editEmpId, salaryDetailsOfEmp, salaryDetailsEmpId, detailsEmpComp, showDetailsOfEmpId, leaveDetailsOfEmp, leaveDetailsEmpId, searchingByName} = this.state
        const filteredList = employeeList.filter(each =>
            each.empname
                .toLowerCase()
                .includes(searchingByName.toLowerCase())
        )
        return (
            <>
                {showEmp &&
                 <div className="admin-employee-list-main-bg-container">
                    <h1 className="admin-employee-list-main-heading">Manage Employees</h1>
                    <div className="admin-employee-list-search-and-btn-cont">
                        <input type="search" placeholder="Search By Emp Name" className="admin-employee-search-btn" onChange={this.onSearchByName}/>
                        <button className='admin-add-emp-btn' onClick={this.onAddNewBtn}>Add New Employee</button>
                    </div>
                    <>
                        {filteredList.length === 0 ? (
                                <p className="no-employees">No employees found</p>
                        ) : (
                            <ul className='admin-employee-ul-container'>
                            <li className='employee-details-headings-list'><p className="emp-details-srno-para-width">S No</p><p className="emp-details-para-width">Name</p><p className="emp-details-para-width">DOB</p><p className="emp-details-para-width">Deparment</p><p className="emp-details-action-para-width">Action</p></li>
                            {filteredList.map((each, index) => (
                                <li key={each.empid} className='employee-details-list-item'>
                                    <p className="emp-details-srno-para-width">{index + 1}</p>
                                    <p className="emp-details-para-width">{each.empname}</p>
                                    <p className="emp-details-para-width">{each.dob}</p>
                                    <p className="emp-details-para-width">{each.department}</p>
                                    <p className="emp-details-action-para-width">
                                        <button className='employee-list-item-edit-btn' onClick={() => this.onEditEmpDetails(each.empid)}>Edit</button>
                                        <button className='employee-list-item-salary-btn' onClick={() => this.onSalaryDetails(each.empid)}> Salary</button>
                                        <button className='employee-list-item-details-btn' onClick={() => this.onEmployeeDetails(each.empid)}> View</button>
                                        <button className='employee-list-item-leaves-btn' onClick={() => this.onEmployeeLeaveDetails(each.empid)}> Leave</button>
                                    </p>
                                </li>
                            ))}
                            </ul>
                        )}
                    </>
                 </div>
                }
                {addNewEmpForm && <AddingNewEmpolyee onAddingEmployee={this.onAddingEmployee}/>}
                {editEmpForm && <UpdateEmployeeDetails id={editEmpId} onUpdateEmployee={this.onUpdateEmployee} />}
                {salaryDetailsOfEmp && <AdminSalaryDetailsOfEmp id={salaryDetailsEmpId} onBackOfSalaryDetails={this.onBackOfSalaryDetails} />}
                {detailsEmpComp && <AdminEmployeeProfile id={showDetailsOfEmpId} onBackOfEmployeeDetails={this.onBackOfEmployeeDetails} />}
                {leaveDetailsOfEmp && <AdminLeaveDetailsOfEmp id={leaveDetailsEmpId} onBackOfLeaveDetails={this.onBackOfLeaveDetails} />}
            </>
        )
    }
}

export default AdminEmployeeList



