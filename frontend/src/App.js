import {Route, Routes} from 'react-router-dom'
import LoginWithNavigation from "./components/Login"
import Home from "./components/Home"
import ProtectedRoute from './components/ProtecedRoute'
import EMSContext from './context/EmsContext'
import { Component } from 'react'

class App extends Component{
  state = {
    user: null, 
    loading: true
  }
  componentDidMount() {
      this.getLoggedInUser()
  }

  getLoggedInUser = async () => {
    const jwtToken = sessionStorage.getItem('jwt_token')
    if (!jwtToken) {
        this.setState({
            loading: false
        })
        return
    }
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    }
    const response = await fetch('http://localhost:3001/user',options)
    if (response.ok) {
        const data = await response.json()
        this.setState({
            user: data.userData,
            loading: false
        })
    }
    else {
      // sessionStorage.removeItem('jwt_token')
      this.setState({
          user: null,
          loading: false
      })
    }
  }
  render(){
    const {user,loading} = this.state
    console.log("logged in user details",user)
    return (
      <EMSContext.Provider value={{user}}>
        <Routes>
          <Route path="/login" element={<LoginWithNavigation onLoginSuccess={this.getLoggedInUser}/>}/>
          <Route path="/" element={<ProtectedRoute loading={loading} user={user}><Home /></ProtectedRoute>} />
        </Routes>
      </EMSContext.Provider>
    )
}
}
export default App;
