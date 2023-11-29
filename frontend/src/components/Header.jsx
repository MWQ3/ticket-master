import { Link, useNavigate } from "react-router-dom"
import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa"
import { reset, logout } from "../features/auth/authSlice"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"


function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
        toast.success('Log-out Successful')
    }

  return (
    <header className="header">
        <div className="icon">
            <Link to='/'>Support Desk</Link>
        </div>
        <ul>

            {user ? (
                <button onClick={handleLogout} className="btn">< FaSignOutAlt /> Logout</button>    
            ) : (
                <>
                <li>
                    <Link to='/login'>
                        < FaSignInAlt /> Login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        < FaUser /> Register
                    </Link>
                </li>
                </>
            )}

        </ul>
    </header>
  )
}

export default Header