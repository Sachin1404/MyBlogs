import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function AuthLayout({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const userStatus = useSelector(state => state.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if(authentication && userStatus !== authentication){
            navigate("/login")
        } else if(!authentication && userStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [userStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}