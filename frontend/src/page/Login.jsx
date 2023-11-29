import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FaSignInAlt } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { login, reset } from "../features/auth/authSlice"
import Loading from "../components/Loading"

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {email, password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())

  }, [isError, isSuccess, navigate, dispatch, message, user])

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }
    dispatch(login(userData))

  }

  if(isLoading) {
    return < Loading />
  }

  return (
    <>
      <section className="heading">
        <h1>
          < FaSignInAlt /> Login
        </h1>
        <p>Please Login</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <input 
            type="email"
            id="email"
            name="email"
            value={email}
            className="form-control"
            placeholder="Enter your Email"
            onChange={handleChange}
            required />
          </div>

          <div className="form-group">
            <input 
            type="password"
            id="password"
            name="password"
            value={password}
            className="form-control"
            placeholder="Enter your Password"
            onChange={handleChange}
            required />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Login</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login