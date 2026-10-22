import {Component} from 'react'
import './index.css'
import EmployeeAddingNewLeave from "../EmployeeAddingNewLeave";


class EmployeeLeaves extends Component{
    state = {
        employeeLeaveList : [],
        addNewLeaveForm: false, 
        showLeaves: true,
        searchingByStatus: ''
    }
    componentDidMount(){
        this.getEmployeeLeavesDetails()
    }
    getEmployeeLeavesDetails = async () => {
        const jwtToken = sessionStorage.getItem('jwt_token')
        const options = {
            method: "GET",
            credentials: "include",
            headers: {Authorization: `Bearer ${jwtToken}`}
        }
        const url = `http://localhost:3001/leaves/my-leaves`
        const response = await fetch(url, options)
        if (response.ok === true){
            const data = await response.json() 
            this.setState({
                employeeLeaveList: data.employeeLeaveDetails 
            })
        }
        else{
            this.setState({
                employeeLeaveList: []
            })

        }
        
    }
    onAddNewLeaveBtn = () => {
        this.setState({
            addNewLeaveForm : true,
            showLeaves: false
        })
    }
    
    onAddingLeave = async () => {
        await this.getEmployeeLeavesDetails()
        this.setState({
            addNewLeaveForm: false,
            showLeaves: true,
        })
    }
    onSearchByStatus = event => {
        this.setState({
            searchingByStatus: event.target.value
        })
    }
    

    render(){
        const {employeeLeaveList, addNewLeaveForm, showLeaves, searchingByStatus} = this.state
        const filteredList = employeeLeaveList.filter(each =>
            each.status
                .toLowerCase()
                .includes(searchingByStatus.toLowerCase())
        )
        return (
            <>
                {showLeaves &&
                 <div className="employee-leaves-list-main-bg-container">
                    <h1 className="employee-leaves-list-main-heading">Manage Leaves</h1>
                    <div className="employee-leaves-search-and-btn-cont">
                        <input type="search" placeholder="Search By Status" className="employee-leaves-search-btn" onChange={this.onSearchByStatus}/>
                        <button className='employee-add-leave-btn' onClick={this.onAddNewLeaveBtn}>Add New Leave</button>
                    </div>
                    <>
                        {filteredList.length === 0 ? (
                                <p className="no-employees">No Leaves found</p>
                        ) : (
                            <ul className='employee-leaves-ul-container'>
                            <li className='employee-details-headings-list'><p className="emp-details-srno-para-width">S No</p><p className="emp-details-para-width">Leave Type</p><p className="emp-details-para-width">From</p><p className="emp-details-para-width">To</p><p className="emp-details-para-width">Description</p><p className="emp-details-para-width">Applied Date</p><p className="emp-details-para-width">Status</p></li>
                            {filteredList.map((each, index) => (
                                <li key={index} className='employee-details-list-item'>
                                    <p className="emp-details-srno-para-width">{index + 1}</p>
                                    <p className="emp-details-para-width">{each.leavetype}</p>
                                    <p className="emp-details-para-width">{each.from_date}</p>
                                    <p className="emp-details-para-width">{each.to_date}</p>
                                    <p className="emp-details-para-width">{each.description}</p>
                                    <p className="emp-details-para-width">{each.apply_date}</p>
                                    <p className="emp-details-para-width">{each.status}</p>
                                </li>
                            ))}
                            </ul>
                        )}
                    </>
                 </div>
                }
                {addNewLeaveForm && <EmployeeAddingNewLeave onAddingLeave={this.onAddingLeave} getEmployeeLeavesDetails={this.getEmployeeLeavesDetails} />}
           </>
        )
    }
}

export default EmployeeLeaves
