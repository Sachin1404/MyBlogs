import { useDispatch } from "react-redux";
import AuthService from "../Appwrite/auth";
import { logout as storeLogout} from "../Store/authSlice";
import { useNavigate } from "react-router-dom";
function Logout(){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const logouthandler=()=>{
        AuthService.logout().then(()=>{
            dispatch(storeLogout());
            navigate("/")
        })
    }
    return (
        <button onClick={logouthandler} className='inline-bock px-6 py-2 duration-200 hover:bg-gray-600 rounded-full text-gray-200 text-lg font-bold'>Logout</button>
    )
}
export default Logout;