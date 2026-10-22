
import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({children, user, loading}) => {
  
  if (loading) {
    return <h1>Loading</h1>
  }
  if (user == null){
    return <Navigate to="/login" replace />
  }
  return children
}

export default ProtectedRoute

