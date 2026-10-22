import {Component} from 'react' 
import './index.css'
// import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'

class Login extends Component{
    state = {
        showPara: false,
        username: '',
        password: '', 
        showErrorMsg: false,
        errorMsgText: ''
    }
    onUsername = event => {
        this.setState({
            username: event.target.value
        })
    }
    onPassword = event => {
        this.setState({
            password: event.target.value
        })
    }
    onSuccess = async jwtToken => {
        
        // Cookies.set('jwt_token', jwtToken, {expires: 7})
        sessionStorage.setItem('jwt_token', jwtToken)
        await this.props.onLoginSuccess()
        this.props.navigate("/")
    }
    onFailure = errorMsg => {
        this.setState({
            showErrorMsg: true,
            errorMsgText: errorMsg
        })
    }
    onFormSubmit = async event => {
        event.preventDefault() 
        const {username, password} = this.state 
        const newUser = {
            username,
            password
        }
        const url = "http://localhost:3001/login"
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok === true){
            this.onSuccess(data.jwt_token)
            // this.onSuccess()
        }
        else{
            this.onFailure(data.error_msg)
        }
    }
    render(){
        const {showErrorMsg, errorMsgText} = this.state 
        return (
            <div className="login-main-bg-container"> 
                <h1 className='main-heading'>Employee Management System</h1>
                <div className="form-container">
                    <h1 className="form-heading">Login</h1>
                    <form onSubmit={this.onFormSubmit}>
                        <label className="label-element">Username</label><br />
                        <input type="email" className='login-page-input-element' onChange={this.onUsername}/><br />
                        <label className='label-element'>Password</label><br />
                        <input type="password" className='login-page-input-element' onChange={this.onPassword}/><br />
                        <button className="login-btn">Login</button>
                        {showErrorMsg && <p className="show-para">{errorMsgText} * </p>}
                    </form>
                </div>
            </div>
        )
    }
}

const LoginWithNavigation = props => {
    const navigate = useNavigate()

    return <Login {...props} navigate={navigate} />
}

export default LoginWithNavigation


