import { Component } from "react"; 
import './index.css'

class AdminSalaryDetailsOfEmp extends Component{
    state = {
        salaryDetailsOfEmpList : []
    }
    componentDidMount(){
        this.getSalaryDetailsOfEmp()
    }
    getSalaryDetailsOfEmp = async () => {
        const jwtToken = sessionStorage.getItem('jwt_token')
        const {id} = this.props
        const options = {
            method: "GET",
            credentials: "include",
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        }
        const url = `http://localhost:3001/salaries/employee/${id}`
        const response = await fetch(url, options)
        const data = await response.json() 
        console.log("Salary Details i got from server: ", data.salaryDetailsOfEmp)
        this.setState({
            salaryDetailsOfEmpList: data.salaryDetailsOfEmp  || []
        })

    }
    onBack = () => {
        const {onBackOfSalaryDetails} = this.props 
        onBackOfSalaryDetails()
    }
    render() {
        const {salaryDetailsOfEmpList} = this.state
        console.log("Salary details in state: ", salaryDetailsOfEmpList)
        return (
            <div className="admin-employee-salary-list-main-bg-container">
                <h1 className="admin-employee-salary-list-main-heading">Salary History</h1>
                <>
                    {salaryDetailsOfEmpList.length === 0 ? (
                            <p className="no-salary">No Salries found</p>
                    ) : (
                        <ul className='admin-employee-salary-ul-container'>
                        <li className='employee-salary-details-headings-list'><p className="admin-salary-details-para">S No</p><p className="admin-salary-details-para">Employee Id</p><p className="admin-salary-details-para">Salary</p><p className="admin-salary-details-para">Allowances</p><p className="admin-salary-details-para">Deduction</p><p className="admin-salary-details-para">Total</p><p className="admin-salary-details-para">Pay Date</p></li>
                        {salaryDetailsOfEmpList.map((each, index) => (
                            <li key={each.id} className='employee-salary-details-list-item'>
                                <p className="admin-salary-details-para">{index+ 1}</p>
                                <p className="admin-salary-details-para">{each.emp_id}</p>
                                <p className="admin-salary-details-para">{each.salary}</p>
                                <p className="admin-salary-details-para">{each.allowances}</p>
                                <p className="admin-salary-details-para">{each.deduction}</p>
                                <p className="admin-salary-details-para">{each.total}</p>
                                <p className="admin-salary-details-para">{each.pay_date}</p>
                            </li>
                        ))}
                        </ul>
                    )}
                </>
                <button onClick={this.onBack} className="emp-salary-details-back-btn">Back</button>
            </div>
        )
    }
}

export default AdminSalaryDetailsOfEmp
