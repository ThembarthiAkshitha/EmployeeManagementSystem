import EMSContext from "../../context/EmsContext"
import Header from "../Header"
import './index.css'
import {Component} from 'react'
import EmployeeDashboard from "../EmployeeDashboard"
import EmployeeLeaves from "../EmployeeLeaves"
import EmployeeSettings from "../EmployeeSettings"
import EmployeeSalary from "../EmployeeSalary"
import EmployeeProfile from "../EmployeeProfile"
import {
    FaTachometerAlt,
    FaUsers,
    FaCalendarAlt,
    FaMoneyBillAlt,
    FaCogs
} from 'react-icons/fa'

const sideBarlist = [
    {id: 1, listName: 'Dashboard', icon: FaTachometerAlt},
    {id: 2, listName: 'Profile', icon: FaUsers},
    {id: 3, listName: 'Leaves', icon: FaCalendarAlt},
    {id: 4, listName: 'Salary', icon: FaMoneyBillAlt},
    {id: 5, listName: 'Settings', icon: FaCogs},
]

class Employee extends Component{
    state = {
        activeId: sideBarlist[0].id
    }
    onSideBtnClick = id => {
        this.setState({
            activeId: id
        })
    }
    empSideBar = () => {
        const {activeId} = this.state
        return (
            <ul className="employee-sidebar-unordli-main-container">
                {sideBarlist.map(each => {
                    const Icon = each.icon
                    return (
                        <li key={each.id}>
                            <button
                                type="button"
                                className={`side-bar-button ${
                                    activeId === each.id ? 'active' : ''
                                }`}
                                onClick={() => this.onSideBtnClick(each.id)}
                            >
                                <Icon className="sidebar-icon" />
                                <span>{each.listName}</span>
                            </button>
                        </li>
                    )
                })}
            </ul>
        )
       
    }

    
    render(){
        
        return (
            <EMSContext.Consumer>
                {value => {
                    const {user} = value
                    const {empid} = user
                    console.log("id: ",user.empid)
                    const renderMainComponent = () => {
                        const {activeId} = this.state
                        switch(activeId){
                            case 1:
                                return <EmployeeDashboard /> 
                            case 2:
                                return <EmployeeProfile />
                            case 3:
                                return <EmployeeLeaves />
                            case 4:
                                return <EmployeeSalary id={empid} /> 
                            case 5:
                                return <EmployeeSettings /> 
                            default:
                                return null
                        }
                    }
                    return(
                    <div className="employee-main-bg-container">
                        <Header />
                        <div className="employee-bottom-container">
                            <div>
                                {this.empSideBar()}
                            </div>
                            <div className="content-container">
                                {renderMainComponent()}
                            </div>
                        </div>
                    </div>
                )}}
            </EMSContext.Consumer>
        )
    }
}


export default Employee


