import {Component} from 'react' 
import './index.css'
import { useContext } from 'react'
import EMSContext from '../../context/EmsContext'

const EmployeeProfile = () => {
    
    const employee = useContext(EMSContext)
    const {user} = employee
    const {empid, empname, email, dob, gender, designation, role, salary, department} = user
    const imageUrl = gender == 'Female' ? 'https://res.cloudinary.com/dgkjelk9d/image/upload/v1791113745/girl_profile_e4m0t3.png' : 'https://res.cloudinary.com/dgkjelk9d/image/upload/v1791113757/boys_profile_izm1fc.png'
    return (

        <div className='employee-details-container'>
            <h1 className='employee-details-main-heading'>Employee Details</h1>
            <div className="employee-profile-image-and-details-container">
                <div className='employee-profile-container'>
                    <img src={imageUrl} className='employee-profile-image'/>
                </div>
                <div>
                    <p className='emp-details-heading'>Name: <span className='emp-details-desc'>{empname}</span></p>
                    <p className='emp-details-heading'>Employee Id: <span className='emp-details-desc'>{empid}</span></p>
                    <p className='emp-details-heading'>Date of Birth: <span className='emp-details-desc'>{dob}</span></p>
                    <p className='emp-details-heading'>Gender: <span className='emp-details-desc'>{gender}</span></p>
                    <p className='emp-details-heading'>Department: <span className='emp-details-desc'>{department}</span></p> 
                </div>
            </div>
        </div>
    )
}





export default EmployeeProfile