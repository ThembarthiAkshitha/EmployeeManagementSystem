import {Component} from 'react' 
import './index.css'

class AdminEmployeeProfile extends Component{
    state = {
        employeeDetails: []
    }
    componentDidMount(){
        this.getEmployeeDetails()
    }
    getEmployeeDetails = async () => {
        const jwtToken = sessionStorage.getItem('jwt_token')
        const {id} = this.props
        const options = {
            method: "GET",
            credentials: "include",
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        }
        const url = `http://localhost:3001/employees/${id}`
        const response = await fetch(url, options)
        const data = await response.json() 
        console.log("Employee Details From Server: ", data.employeeDetails)
        this.setState({
            employeeDetails: data.employeeDetails 
        })
    }
    onBackOfEmp = () =>{
        const {onBackOfEmployeeDetails} = this.props 
        onBackOfEmployeeDetails()
    }

    render(){
        const {employeeDetails} = this.state 
        const {empid, empname, dob, gender,  department} = employeeDetails
        const imageUrl = gender === 'Female' ? 'https://res.cloudinary.com/dgkjelk9d/image/upload/v1791113745/girl_profile_e4m0t3.png' : 'https://res.cloudinary.com/dgkjelk9d/image/upload/v1791113757/boys_profile_izm1fc.png'
        return (

            <div className='employee-details-container'>
                <h1 className='employee-details-main-heading'>Employee Details</h1>
                <div className="employee-profile-image-and-details-container">
                    <div className='employee-profile-container'>
                        <img src={imageUrl} className='employee-profile-image' alt='profile-image'/>
                    </div>
                    <div>
                        <p className='emp-details-heading'>Name: <span className='emp-details-desc'>{empname}</span></p>
                        <p className='emp-details-heading'>Employee Id: <span className='emp-details-desc'>{empid}</span></p>
                        <p className='emp-details-heading'>Date of Birth: <span className='emp-details-desc'>{dob}</span></p>
                        <p className='emp-details-heading'>Gender: <span className='emp-details-desc'>{gender}</span></p>
                        <p className='emp-details-heading'>Department: <span className='emp-details-desc'>{department}</span></p> 
                        <button className='employe-details-back-btn' onClick={this.onBackOfEmp}>Back</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminEmployeeProfile



