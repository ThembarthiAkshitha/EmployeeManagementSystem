import Header from "../Header"
import './index.css'
import {Component} from 'react'
import AdminDashboard from "../AdminDashboard"
import AdminDepartments from "../AdminDepartments"
import AdminEmployeeList from "../AdminEmployeeList"
import AdminLeaves from "../AdminLeaves"
import AdminAddingSalary from "../AdminAddingSalary"
import AdminSettings from "../AdminSettings"
import {
    FaTachometerAlt,
    FaUsers,
    FaBuilding,
    FaCalendarAlt,
    FaMoneyBillAlt,
    FaCogs
} from 'react-icons/fa'

const sideBarlist = [
    {id: 1, listName: 'Dashboard', icon: FaTachometerAlt},
    {id: 2, listName: 'Employees', icon: FaUsers},
    {id: 3, listName: 'Departments', icon: FaBuilding},
    {id: 4, listName: 'Leaves', icon: FaCalendarAlt},
    {id: 5, listName: 'Salary', icon: FaMoneyBillAlt},
    {id: 6, listName: 'Settings', icon: FaCogs},
]


class Admin extends Component{
    state = {
        activeId: sideBarlist[0].id
    }
    onSideBtnClick = id => {
        this.setState({
            activeId: id
        })
    }
    sideBar = () => {
        const {activeId} = this.state
        return (
            <ul className="admin-sidebar-unordli-main-container">
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
                                <span className="sidebar-label">{each.listName}</span>
                            </button>
                        </li>
                    )
                })}
            </ul>
        )
    }

    renderTheMainComponent = () => {
        const {activeId} = this.state
        switch(activeId){
            case 1:
                return <AdminDashboard /> 
            case 2:
                return <AdminEmployeeList />
            case 3:
                return <AdminDepartments /> 
            case 4:
                return <AdminLeaves />
            case 5:
                return <AdminAddingSalary /> 
            case 6:
                return <AdminSettings /> 
            default:
                return null
        }
    }
    render(){
        return (
            <div className="admin-main-bg-container">
                <Header />
                <div className="admin-bottom-container">
                    <div className="sidebar-container">
                        {this.sideBar()}
                    </div>
                    <div className="content-container">
                        {this.renderTheMainComponent()}
                    </div>
                </div>
            </div>
        )
    }

}

export default Admin

