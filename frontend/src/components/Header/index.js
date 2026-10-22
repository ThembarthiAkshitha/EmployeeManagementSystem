import './index.css'
import {useNavigate} from 'react-router-dom'
import EMSContext from '../../context/EmsContext'
import { useContext } from 'react'


const Header = () => {
    const navigate = useNavigate()
    const {user} = useContext(EMSContext)
    const valueAfterGreet = user?.role === 'Admin' ? user.role : user?.empname
    const onLogout = () => {
        sessionStorage.removeItem('jwt_token')
        navigate("/login")
    }
    return (
        <div className="header-main-bg-container">
            <h1 className="logo-heading">EMS</h1>
            <p className="greeting-para">Welcome {valueAfterGreet}!</p>
            <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>   
    )

}

export default Header


