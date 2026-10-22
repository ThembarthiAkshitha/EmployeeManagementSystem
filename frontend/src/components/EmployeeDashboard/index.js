
import './index.css'
import { useContext } from 'react'
import EMSContext from '../../context/EmsContext'

const EmployeeDashboard = () => {
    
    const employee = useContext(EMSContext)
    const {user} = employee
    const {empname, gender} = user
    const imageUrl = gender === 'Female' ? 'https://res.cloudinary.com/dgkjelk9d/image/upload/v1791113745/girl_profile_e4m0t3.png' : 'https://res.cloudinary.com/dgkjelk9d/image/upload/v1791113757/boys_profile_izm1fc.png'
    return (

        <div className='employee-dashboard-profile-image-and-name-container'>
            <div><img className="employee-dashboard-profile-image" src={imageUrl} alt='profile-image'/></div>
            <div>
                <h1 className='employee-dashboard-main-heading'>Welcome Back</h1>
                <p>{empname}</p>
            </div>
        </div>
    )
}



export default EmployeeDashboard