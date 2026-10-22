import {Component} from 'react'
import './index.css'
import AdminEmployeeLeaveDetails from '../AdminEmployeeLeaveDetails'

class AdminLeaves extends Component{
    state = {
        employeeLeavesList : [],
        showEmpLeaves: true,
        showDetailsOfEmpId: null,
        detailsOfEmpLeaveComp: false,
        detailsOfEmpLeaveId: null, 
        searchByEmpId: '',
        selectedStatus: 'All'
    }
    componentDidMount(){
        this.getEmployeeLeavesDetails()
    }
    getEmployeeLeavesDetails = async () => {
        const jwtToken = sessionStorage.getItem('jwt_token')
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        }
        const url = `http://localhost:3001/leaves`
        const response = await fetch(url, options)
        const data = await response.json() 
        this.setState({
            employeeLeavesList: data.employeeLeavesData || []
        })
    }
    
    onStatusBtnClick = status => {
        this.setState({
            selectedStatus: status
        })
    }

    onViewLeaveDetails = id => {
        this.setState({
            detailsOfEmpLeaveComp: true,
            showEmpLeaves: false,
            detailsOfEmpLeaveId: id
        })
    }
    onAccepted = async () => {
        await this.getEmployeeLeavesDetails()
        this.setState({
            showEmpLeaves: true, 
            detailsOfEmpLeaveComp: false
        })
    }
    onRejected = async () => {
        await this.getEmployeeLeavesDetails()
        this.setState({
            showEmpLeaves: true, 
            detailsOfEmpLeaveComp: false
        })
    }
    onBackOfEmployeeLeaveDetails = async () => {
        this.setState({
            detailsOfEmpLeaveComp: false,
            showEmpLeaves: true
        })
    }
    onSearchByEmpId = event => {
        this.setState({
            searchByEmpId: event.target.value
        })
    }
    
    render(){
        const {employeeLeavesList, showEmpLeaves, detailsOfEmpLeaveComp, detailsOfEmpLeaveId, searchByEmpId, selectedStatus} = this.state
        const filteredList = employeeLeavesList.filter(each => {
            const matchesEmpId = (each.empid || '')
                .toLowerCase()
                .includes(searchByEmpId.trim().toLowerCase())

            const matchesStatus =
                selectedStatus === 'All' || each.status === selectedStatus

            return matchesEmpId && matchesStatus
        })
        console.log(employeeLeavesList)
        return (
            <>
                {showEmpLeaves &&
                 <div className="admin-employee-leaves-list-main-bg-container">
                    <h1 className="admin-employee-leaves-list-main-heading">Manage Leaves</h1>
                    <div className="admin-employee-leaves-list-search-and-btn-cont">
                        <input type="search" placeholder="Search By Employee Id" className="admin-employee-leaves-search-btn" onChange={this.onSearchByEmpId}/>
                        <>
                            <button className={`admin-add-emp-btn ${selectedStatus === 'Pending' ? 'active' : ''}`} onClick={() => this.onStatusBtnClick('Pending')}>Pending</button>
                            <button className={`admin-add-emp-btn ${selectedStatus === 'Accepted' ? 'active' : ''}`} onClick={() => this.onStatusBtnClick('Accepted')}>Accdpted</button>
                            <button className={`admin-add-emp-btn ${selectedStatus === 'Rejected' ? 'active' : ''}`} onClick={() => this.onStatusBtnClick('Rejected')}>Rejection</button>
                        </>
                    </div>
                    <>
                        {filteredList.length === 0 ? (
                                <p className="no-employees">No Leaves found</p>
                        ) : (
                            <ul className='admin-employee-leaves-ul-container'>
                            <li className='employee-details-headings-list'><p className="emp-details-srno-para-width">S No</p><p className="emp-details-para-width">Emp ID</p><p className="emp-details-para-width">Name</p><p className="emp-details-para-width">Leave Type</p><p className="emp-details-para-width">Department</p>
                            <p className="emp-details-para-width">Days</p><p className="emp-details-para-width">Status</p><p className="emp-details-para-width">Action</p></li>
                            {filteredList.map((each, index) => (
                                <li key={index+1} className='employee-details-list-item'>
                                    <p className="emp-details-srno-para-width">{index + 1}</p>
                                    <p className="emp-details-para-width">{each.empid}</p>
                                    <p className="emp-details-para-width">{each.empname}</p>
                                    <p className="emp-details-para-width">{each.leavetype}</p>
                                    <p className="emp-details-para-width">{each.department}</p>
                                    <p className="emp-details-para-width">{each.no_of_days}</p>
                                    <p className="emp-details-para-width">{each.status}</p>
                                    <p className="emp-details-para-width">
                                        <button className='employee-list-item-view-btn' onClick={() => this.onViewLeaveDetails(each.srno)}>View</button>
                                    </p>
                                </li>
                            ))}
                            </ul>
                        )}
                    </>
                 </div>
                }
                {detailsOfEmpLeaveComp && <AdminEmployeeLeaveDetails id={detailsOfEmpLeaveId} onBackOfEmployeeLeaveDetails={this.onBackOfEmployeeLeaveDetails} onAccepted={this.onAccepted} onRejected={this.onRejected} />}
            </>
        )
    }
}


export default AdminLeaves

