import { Component } from "react";
import './index.css'

class EmployeeAddingNewLeave extends Component{
    state = {
        leaveType: 'Sick Leave',
        fromDate: '',
        toDate: '',
        description: '',
    }

    onLeaveType = event =>{
        this.setState({
            leaveType: event.target.value
        })
    }
    
    onFromDate = event => {
        this.setState({
            fromDate: event.target.value
        })
    }

    onToDate = event => {
        this.setState({
            toDate: event.target.value
        })
    }

    onDescrition = event => {
        this.setState({
            description: event.target.value
        })
    }

    onAddingLeaveDetails = async event => {
        event.preventDefault()
        const {onAddingLeave, getEmployeeLeavesDetails} = this.props
        const {leaveType, fromDate, toDate, description} = this.state
        const newLeave = {
            leaveType, fromDate, toDate, description
        }
        try{
            const jwtToken = sessionStorage.getItem('jwt_token')
            const options = {
                method: "POST",
                headers: {
                    "Content-type" : "application/json",
                    Authorization: `Bearer ${jwtToken}`
                },
                body: JSON.stringify(newLeave)
            }
            const url = `http://localhost:3001/leaves`
            const response = await fetch(url, options)
            const result = await response.text()
            if (response.ok) {
                alert('Leave added successfully')
                await getEmployeeLeavesDetails()
                onAddingLeave()
            } else {
                console.error('Failed to add leave:', response.status, result)
                alert(result)
            }
        }catch (error) {
            console.error('Error submitting leave:', error)
        }
    }
    render(){
        const { leaveType, toDate, fromDate, description} = this.state
       
        return (
            <div className='add-new-leave-form-container'>
                <h1 className='add-new-leave-main-heading'>Request for Leave</h1>
                <form onSubmit={this.onAddingLeaveDetails}>
                    <label>Leave Type</label> <br />
                    <select className='input-element' onChange={this.onLeaveType} value={leaveType}>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Casual Leave">Casual Leave</option>
                        <option value="Annual Leave">Annual Leave</option>
                    </select> 
                    <div className='from-to-dates-container'>
                        <div>
                            <label>From Date</label> <br />
                            <input type="date" className='date-input-element' onChange={this.onFromDate} value={fromDate}/>
                        </div>
                        <div>
                            <label>To Date</label> <br />
                            <input type="date" className='date-input-element' onChange={this.onToDate} value={toDate}/>
                        </div>
                    </div>
                    <label>Description</label><br />
                    <textarea onChange={this.onDescrition} className='input-element' value={description} cols='10' rows='10' /><br />
                    
                    <button className="employee-add-leave-btn" type="submit">Add Leave</button>
                </form>
            </div>
        )
    }
}

export default EmployeeAddingNewLeave





