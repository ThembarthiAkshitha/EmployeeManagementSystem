import {Component} from 'react' 
import './index.css'


class EmployeeSettings extends Component {
    state = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    }

    onNewPassword = event => {
        this.setState({
            newPassword: event.target.value
        })
    }
    onOldPassword = event => {
        this.setState({
            oldPassword: event.target.value
        })
    }
    onConfirmPassword = event => {
        this.setState({
            confirmPassword: event.target.value
        })
    }
    
    onChangePassword = async event => {
        event.preventDefault()
        const {oldPassword, newPassword, confirmPassword} = this.state 
        if (confirmPassword !== newPassword){
            alert("New Password and Confirm Passwords are not matched")
            return 
        }
        const updatedPassword = {
            oldPassword, newPassword
        }
        console.log("Sending:", updatedPassword)
        const jwtToken = sessionStorage.getItem('jwt_token')
        const options = {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-type" : "application/json",
                Authorization: `Bearer ${jwtToken}`
            },
            body: JSON.stringify(updatedPassword)
        }
        const url = `http://localhost:3001/change-password/`
        const response = await fetch(url, options)
        const data = await response.text()
        if (response.ok === true){
            alert("Password Updated Successfully")
            this.setState({
                newPassword:'',
                confirmPassword:'',
                oldPassword: ''
            })
        }
        else{
            alert(data)
        }
    }
    render(){
        const {oldPassword, newPassword, confirmPassword} = this.state
        return(
            <div className='employee-change-password-form-container'>
                <h1 className='employee-change-password-main-heading'>Change Password</h1>
                <form onSubmit={this.onChangePassword}> 
                    <div className='employee-change-password-form'>
                            <label>Old Password</label> <br />
                            <input type="password" className='input-element' onChange={this.onOldPassword} value={oldPassword}/><br />
                            <label>New Password</label> <br />
                            <input type="password" className='input-element' onChange={this.onNewPassword} value={newPassword}/><br />
                            <label>Confirm Password</label> <br />
                            <input type="password" className='input-element' onChange={this.onConfirmPassword} value={confirmPassword}/>
                    </div>
                    <button className="employee-change-password-update-btn" type="submit">Update Password</button>
                </form>
            </div>
        )
    }
}



export default EmployeeSettings