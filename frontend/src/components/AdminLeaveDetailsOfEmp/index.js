import {Component} from 'react'
import './index.css'


class AdminLeaveDetailsOfEmp extends Component{
    state = {
        employeeLeaveList : [],
        loading: true,
        searchingByStatus: ''
    }
    componentDidMount(){
        this.getEmployeeLeavesDetails()
    }
    getEmployeeLeavesDetails = async () => {
        const jwtToken = sessionStorage.getItem('jwt_token') 
        const {id} = this.props
        try {
            const options = {
                method: "GET",
                headers: {Authorization: `Bearer ${jwtToken}`}
            }
            const url = `http://localhost:3001/leaves/employee/${id}`
            const response = await fetch(url, options)
            if (response.ok === true){
                const data = await response.json() 
                this.setState({
                    employeeLeaveList: data.leaveDetailsOfEmp || [],
                    loading: false
                })
            }
            else{
                console.error(
                    'Failed to fetch leave details:',
                    await response.text()
                )
                this.setState({
                    employeeLeaveList: [],
                    loading: false
                })
            }
        }catch (error) {
            console.error('Error fetching leave details:', error)

            this.setState({
                employeeLeaveList: [],
                loading: false
            })
        }
    }
    onBack = () => {
        const {onBackOfLeaveDetails} = this.props 
        onBackOfLeaveDetails()
    }
    onSearchByStatus = event => {
        this.setState({
            searchingByStatus: event.target.value
        })
    }
    render(){
        const {employeeLeaveList, searchingByStatus} = this.state
        const filteredList = employeeLeaveList.filter(each =>
            each.status
                .toLowerCase()
                .includes(searchingByStatus.toLowerCase())
        )
        return (
            <div className="admin-employee-leaves-list-main-bg-container">
                <h1 className="admin-employee-leaves-list-main-heading">Manage Leaves</h1>
                <div className="admin-employee-leaves-search-and-btn-cont">
                    <input type="search" placeholder="Search By Status" onChange={this.onSearchByStatus} className="admin-employee-leaves-search-btn"/>
                </div>
                <>
                    {filteredList.length === 0 ? (
                            <p className="no-employees">No Leaves found</p>
                    ) : (
                        <>
                        <ul className='admin-employee-leaves-ul-container'>
                        <li className='admin-employee-details-headings-list'><p className="emp-details-srno-para-width">S No</p><p className="emp-details-para-width">Leave Type</p><p className="emp-details-para-width">From</p><p className="emp-details-para-width">To</p><p className="emp-details-para-width">Description</p><p className="emp-details-para-width">Applied Date</p><p className="emp-details-para-width">Status</p></li>
                        {filteredList.map((each, index) => (
                            <li key={index} className='admin-employee-details-list-item'>
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
                        <button onClick={this.onBack} className='admin-leave-details-of-emp-back-btn'>Back</button>
                        </>
                    )}
                </>
            </div> 
        )
    }
}

export default AdminLeaveDetailsOfEmp


