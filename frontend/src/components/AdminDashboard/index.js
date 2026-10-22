import {Component} from 'react' 
import './index.css'
import {
  FaUsers,
  FaBuilding,
  FaMoneyBillWave,
  FaFileAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle
} from 'react-icons/fa'

class AdminDashboard extends Component {
    state = {
        dashboardDetails: {},
        loading: true
    }
    componentDidMount(){
        this.getDashboardDetails()
    }
    getDashboardDetails = async () => {
        const jwtToken = sessionStorage.getItem('jwt_token') 
        try {
            const options = {
                method: "GET",
                headers: {Authorization: `Bearer ${jwtToken}`}
            }
            const url = `http://localhost:3001/dashboard`
            const response = await fetch(url, options)
            if (response.ok === true){
                const data = await response.json() 
                this.setState({
                    dashboardDetails: data.dashboardDetails || {},
                    loading: false
                })
            }
            else{
                console.error(
                    'Failed to fetch leave details:',
                    await response.text()
                )
                this.setState({
                    dashboardDetails: {},
                    loading: false
                })
            }
        }catch (error) {
            console.error('Error fetching leave details:', error)

            this.setState({
                dashboardDetails: {},
                loading: false
            })
        }
    }
    render(){
        const {dashboardDetails, loading} = this.state 
        if (loading) {
            return <p>Loading dashboard...</p>
        }
        const {
            employeeCount = 0,
            departmentCount = 0,
            monthlyPay = 0,
            leavesCount =0,
            leavesPendingCount = 0,
            leavesApprovedCount = 0 ,
            leavesRejectedCount = 0
        } = dashboardDetails
        
        return(
            <div className='admin-dashboard-container'>
                <h1 className='dashboard-main-heading'>Dashboard Overview</h1>
                <div className='dashboard-details-displaying-row-conatiner'>
                    <div className="dashboard-details-bg-container">
                        <div className="dashboard-details-employee-count">
                            <FaUsers />
                        </div>
                        <div className='dashboard-details-description-container'>
                            <p className='dashboard-details-heading'>Total Employess</p>
                            <p>{employeeCount}</p>
                        </div>
                    </div>
                    <div className="dashboard-details-bg-container">
                        <div className="dashboard-details-departments-count">
                            <FaBuilding />
                        </div>
                        <div className='dashboard-details-description-container'>
                            <div><p className='dashboard-details-heading'>Total Deparments</p></div>
                            <div><p>{departmentCount}</p></div>
                        </div>
                    </div>
                    <div className="dashboard-details-bg-container">
                        <div className="dashboard-details-monthly-pay-count">
                            <FaMoneyBillWave />
                        </div>
                        <div className='dashboard-details-description-container'>
                            <p className='dashboard-details-heading'>Monthly Pay</p>
                            <p>{monthlyPay}</p>
                        </div>
                    </div>
                </div>
                <h2>Leave Details</h2>
                <div className='dashboard-details-displaying-row-conatiner'>
                    <div className="dashboard-details-bg-container">
                        <div className="dashboard-details-leaves-count">
                            <FaFileAlt />
                        </div>
                        <div className='dashboard-details-description-container'>
                            <p className='dashboard-details-heading'>Leave Applied</p>
                            <p>{leavesCount}</p>
                        </div>
                    </div>
                    <div className="dashboard-details-bg-container">
                        <div className="dashboard-details-leaves-approved-count">
                            <FaCheckCircle />
                        </div>
                        <div className='dashboard-details-description-container'>
                            <p className='dashboard-details-heading'>Leave Approved</p>
                            <p>{leavesApprovedCount}</p>
                        </div>
                    </div>
                </div>
                <div className='dashboard-details-displaying-row-conatiner'>
                    <div className="dashboard-details-bg-container">
                        <div className="dashboard-details-leaves-pending-count">
                            <FaHourglassHalf />
                        </div>
                        <div className='dashboard-details-description-container'>
                            <p className='dashboard-details-heading'>Leave Pending</p>
                            <p>{leavesPendingCount}</p>
                        </div>
                    </div>
                    <div className="dashboard-details-bg-container">
                        <div className="dashboard-details-leaves-rejected-count">
                            <FaTimesCircle />
                        </div>
                        <div className='dashboard-details-description-container'>
                            <p className='dashboard-details-heading'>Leave Rejected</p>
                            <p>{leavesRejectedCount}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default AdminDashboard