import {Component} from 'react'
import './index.css'
import AddingNewDepartment from '../AddingNewDepartment'
import UpdateDepartmentDetails from '../UpdateDepartmentDetails'


class AdminDepartments extends Component{
    state = {
        departmentsList: [],
        addNewDeptForm: false, 
        showDept: true,
        editDeptForm: false,
        editDeptId: null,
        searchByDept: ''
    }
    componentDidMount(){
        this.getDepartments()
    }

    getDepartments = async () => {
        const jwtToken = sessionStorage.getItem('jwt_token')
        const options = {
            method: 'GET',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        }
        const url = 'http://localhost:3001/departments'
        const response = await fetch(url, options) 
        if (response.ok === true){
            const data = await response.json()
            this.setState({
                departmentsList: data.departmentData,
            })
        }
    }
    onAddNewDeptBtn = () => {
        this.setState({
            addNewDeptForm : true,
            showDept: false
        })
    }
    onEditDeptDetails = id => {
        this.setState({
            editDeptId: id,
            editDeptForm: true,
            showDept: false
        })
    }
    onUpdateDept = async () => {
        await this.getDepartments()
            this.setState({
                editDeptForm: false,
                showDept: true,
            })
    }
    onAddingDept = async () => {
        await this.getDepartments()
            this.setState({
                addNewDeptForm: false,
                showDept: true,
            })
    }
    onDeleteDeptDetails = async id => {
        const jwtToken = sessionStorage.getItem('jwt_token')
        const options = {
            method: 'DELETE',
            credentials: 'include',
            headers: `Bearer ${jwtToken}`
        }
        const url = `http://localhost:3001/departments/${id}`
        const response = await fetch(url, options) 
        if (response.ok === true){
            await this.getDepartments()
        }
    }
    onSearchByDept = event => {
        this.setState({
            searchByDept: event.target.value
        })
    }
    render(){
        const {departmentsList, addNewDeptForm, showDept, editDeptForm, editDeptId, searchByDept} = this.state
        const filteredList = departmentsList.filter(each =>
            each.dept_name
                .toLowerCase()
                .includes(searchByDept.toLowerCase())
        )
        return (
            <>
                {showDept &&
                 <div className="admin-department-list-main-bg-container">
                    <h1 className="admin-department-list-main-heading">Manage Departments</h1>
                    <div className="admin-department-list-search-and-btn-cont">
                        <input type="search" placeholder="Search By Dept Name" className="admin-department-search-btn" onChange={this.onSearchByDept}/>
                        <button className='admin-department-add-dept-btn' onClick={this.onAddNewDeptBtn}>Add New Departments</button>
                    </div>
                    <>
                        {filteredList.length === 0 ? (
                                <p className="no-department">No Departments found</p>
                        ) : (
                            <ul className='admin-department-ul-container'>
                            <li className='department-details-headings-list'><p className='admin-departments-srno-width'>S No</p><p className='admin-departments-srno-width'>Name</p><p className='admin-departments-srno-width'>Action</p></li>
                            {filteredList.map((each, index) => (
                                <li key={each.dept_id} className='department-details-list-item'>
                                    <p className='admin-departments-srno-width'>{index + 1}</p>
                                    <p className='admin-departments-srno-width'>{each.dept_name}</p>
                                    <p className='admin-departments-srno-width'>
                                        <button className='department-list-item-edit-btn' onClick={() => this.onEditDeptDetails(each.dept_id)}>Edit</button>
                                        <button className='department-list-item-delete-btn' onClick={() => this.onDeleteDeptDetails(each.dept_id)}>Delete</button>
                                    </p>
                                </li>
                            ))}
                            </ul>
                        )}
                    </>
                 </div>
                }
                {addNewDeptForm && <AddingNewDepartment onAddingDept={this.onAddingDept}/>}
                {editDeptForm && <UpdateDepartmentDetails id={editDeptId} onUpdateDept={this.onUpdateDept} />}
            </>
        )
    }
}


export default AdminDepartments