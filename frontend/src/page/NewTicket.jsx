import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { createTicket, reset } from "../features/tickets/ticketSlice"
import { toast } from "react-toastify"
import Loading from "../components/Loading"
import BackButton from "../components/BackButton"

function NewTicket() {
    const {user} = useSelector((state) => state.auth)
    const { isSuccess, isError, isLoading, message } = useSelector((state) => state.ticket)

    const [product, setProduct] = useState('S9+')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        if(isSuccess) {
            dispatch(reset())
            navigate('/tickets')
        }
        dispatch(reset())
    }, [isSuccess, isError, message, dispatch, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createTicket({ product, description }))
    }

    if(isLoading) {
        return < Loading />
    }

  return (
    <>
        < BackButton url='/' />
        <section className="header">
            <h1>Create New Ticket</h1>
            <p>Fill the Form Below</p>
        </section>

        <section className="form">
            <div className="form-group">
                <label htmlFor="name">User Name</label>
                <input 
                id="name"
                className="form-control" 
                value={user.name} 
                disabled/>
            </div>

            <div className="form-group">
                <label htmlFor="email">User Email</label>
                <input 
                id="email" 
                className="form-control"
                value={user.email} 
                disabled/>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="product">Select a Product</label>
                    <select 
                    name="product" 
                    id="product" 
                    value={product} 
                    onChange={(e) => setProduct(e.target.value)}
                    >   
                        <option value="S9+">S9+</option>
                        <option value="S20+">S20+</option>
                        <option value="S21+">S21+</option>
                        <option value="S22+">S22+</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Write a Description of the Issue</label>
                    <textarea 
                    name="description" 
                    id="description" 
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"/>
                </div>
                <div className="form-group">
                    <button className="btn btn-block">Submit</button>
                </div>
            </form>
        </section>
    
    </>
  )
}

export default NewTicket