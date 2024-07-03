import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import AuthService from "./Appwrite/auth"
import { login, logout } from "./Store/authSlice"
import Header from "./Components/Header/Header"
import { Outlet } from "react-router-dom"
import Footer from "./Components/Footer"
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    AuthService.getAccount()
    .then((userdata) => {
      if (userdata) {
        dispatch(login({userdata}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-col bg-[#121212]'>
        <Header />
        <main className="flex-grow min-h-[600px]">
        <Outlet />
        </main>
        <Footer />
      </div>
  ) : null
}
export default App;
