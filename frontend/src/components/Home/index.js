
import { useContext } from "react"
import EMSContext from "../../context/EmsContext"
import Admin from "../Admin"
import Employee from "../Employee" 


const Home = () => {
    const {user} = useContext(EMSContext)
    
    const renderTheUserComponent = () => {
        console.log("USER IN HOME:", user)
    console.log("ROLE IN HOME:", user?.role)
        const {role} = user
        switch(role){
            case 'Admin':
                return <Admin />
            case 'Employee':
                return <Employee />
            default:
                return null
        }
    }
    return (
        renderTheUserComponent()
    )
}

export default Home

