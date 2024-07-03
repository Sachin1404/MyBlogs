import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../Container";
import Logo from "../Logo";
import { Link } from "react-router-dom";
import Logout from "../Logout";
function Header(){
    const userStatus=useSelector((state)=>state.status)
    const navigate=useNavigate()
    const navigateItems=[
        {
            name: 'Home',
            slug: "/",
            active: true
          }, 
          {
            name: "Login",
            slug: "/login",
            active: !userStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !userStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: userStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: userStatus,
        },
    ]
    return (
        <header className='py-3 shadow bg-[#172842]'>
        <Container>
          <nav className='flex'>
            <div className='mr-4'>
              <Link to='/'>
                <Logo/>
  
                </Link>
            </div>
            <ul className='flex ml-auto'>
                {
                    navigateItems.map((element)=>
                        element.active?(<li key={element.name}>
                            <button className=' text-gray-200  inline-bock px-6 py-2 duration-200 hover:bg-gray-600 hover:text-white rounded-full text-lg font-bold' onClick={()=>navigate(element.slug)}>{element.name}</button>
                        </li>):null
                    )
                }
                {
                    userStatus && (
                        <li>
                           <Logout/> 
                        </li>
                    )
                }
            </ul>
          </nav>
          </Container>
      </header>
    )
}
export default Header;