import {Component} from 'react' 
import './index.css'

class AdminEmployeeLeaveDetails extends Component{
    state = {
        employeeLeaveDetails: null
    }
    componentDidMount(){
        this.getEmployeeLeaveDetails()
    }
    getEmployeeLeaveDetails = async () => {
        try{
            const jwtToken = sessionStorage.getItem('jwt_token')
            const {id} = this.props
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
            const url = `http://localhost:3001/leaves/${id}`
            const response = await fetch(url, options)
            
            if (response.ok === true){
                const data = await response.json() 
                console.log('Leave details from server:', data.dashboardDetails)
                this.setState({
                    // employeeLeaveDetails: data.employeeLeaveDetails 
                    employeeLeaveDetails: data.dashboardDetails
                })
            }else {
                const data = await response.text() 
                console.error('Failed to fetch leave:', data)
            }
        }catch (error) {
            console.error('Error fetching leave details:', error)
        }
    }
    onAccept = async event => {
        const {id} = this.props
        const updatedStatus = {
            status : 'Accepted'
        }
        console.log("Sending:", updatedStatus)
        const jwtToken = sessionStorage.getItem('jwt_token')
        const options = {
            method: "PUT",
            headers: {
                "Content-type" : "application/json",
                Authorization: `Bearer ${jwtToken}`
            },
            body: JSON.stringify(updatedStatus)
        }
        const url = `http://localhost:3001/leaves/${id}`
        const response = await fetch(url, options)
        if (response.ok === true){
            const {onAccepted} = this.props 
            onAccepted()
        }
    }
    onReject = async event => {
        const {id} = this.props
        const updatedStatus = {
            status : 'Rejected'
        }
        console.log("Sending:", updatedStatus)
        const jwtToken = sessionStorage.getItem('jwt_token')
        const options = {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-type" : "application/json",
                Authorization: `Bearer ${jwtToken}`
            },
            body: JSON.stringify(updatedStatus)
        }
        const url = `http://localhost:3001/leaves/${id}`
        const response = await fetch(url, options)
        if (response.ok === true){
            const {onRejected} = this.props 
            onRejected()
        }
    }
    onBack = () =>{
        const {onBackOfEmployeeLeaveDetails} = this.props 
        onBackOfEmployeeLeaveDetails()
    }

    render(){
        const {employeeLeaveDetails} = this.state 
        if (employeeLeaveDetails === null) {
            return (
                <div>
                    <p>Loading leave details...</p>
                    <button onClick={this.onBack}>Back</button>
                </div>
            )
        }
        const {empid, empname, leavetype, description, department, from_date, to_date, status, gender} = employeeLeaveDetails
        const imageUrl = gender === 'Female' ? 'https://res.cloudinary.com/dgkjelk9d/image/upload/v1791113745/girl_profile_e4m0t3.png' : 'https://res.cloudinary.com/dgkjelk9d/image/upload/v1791113757/boys_profile_izm1fc.png'
        return (
            <div className='employee-leave-details-container'>
                <h1 className='employee-leave-details-main-heading'>Employee Leave Details</h1>
                <div className="employee-leave-profile-image-and-details-container">
                    <div className='employee-leave-profile-container'>
                        <img src={imageUrl} className='employee-leave-profile-image' alt='profile-image'/>
                    </div>
                    <div>
                        <p className='emp-details-heading'>Name: <span className='emp-details-desc'>{empname}</span></p>
                        <p className='emp-details-heading'>Employee Id: <span className='emp-details-desc'>{empid}</span></p>
                        <p className='emp-details-heading'>Leave Type: <span className='emp-details-desc'>{leavetype}</span></p>
                        <p className='emp-details-heading'>Reason: <span className='emp-details-desc'>{description}</span></p>
                        <p className='emp-details-heading'>Department: <span className='emp-details-desc'>{department}</span></p> 
                        <p className='emp-details-heading'>Start Date: <span className='emp-details-desc'>{from_date}</span></p> 
                        <p className='emp-details-heading'>End Date: <span className='emp-details-desc'>{to_date}</span></p> 
                        <p className='emp-details-heading'>Status: <span>
                            {status === 'Pending' && <><button className='employe-details-accept-btn' onClick={this.onAccept}>Accept</button><button className='employe-details-reject-btn' onClick={this.onReject}>Reject</button></>}
                            {status === 'Accepted' && <button className='employe-details-accept-btn'>Accepted</button>}
                            {status === 'Rejected' && <button className='employe-details-reject-btn'>Rejected</button>}
                        </span></p> 
                    </div>
                </div>
                <button className="employee-details-back-btn" onClick={this.onBack}>Back</button>
            </div>
        )
    }
}

export default AdminEmployeeLeaveDetails



