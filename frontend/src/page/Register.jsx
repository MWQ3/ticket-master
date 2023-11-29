import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaUser } from "react-icons/fa"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"
import { register, reset } from "../features/auth/authSlice"
import Loading from "../components/Loading"

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const {name, email, password, password2} = formData
  
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

  }, [isError, message, isSuccess, user, navigate, dispatch])

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(password !== password2) {
      toast.error('Passwords Don\'t Match')
    } else {
      const userData = {
        name,
        email,
        password,
      }
      dispatch(register(userData))
    }
  }

  if(isLoading) {
    return < Loading />
  }

  return (
    <>
      <section className="heading">
        <h1>
          < FaUser /> Register
        </h1>
        <p>Create an account</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
            type="text"
            id="name"
            name="name"
            value={name}
            className="form-control"
            placeholder="Enter your Name"
            onChange={handleChange}
            required />
          </div>

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
            <input 
            type="password"
            id="password2"
            name="password2"
            value={password2}
            className="form-control"
            placeholder="Verify your Password"
            onChange={handleChange}
            required />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Register</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register