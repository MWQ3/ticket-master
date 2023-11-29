import { Link } from "react-router-dom"
import { FaTimes } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { deleteTicket } from "../features/tickets/ticketSlice"
import { toast } from 'react-toastify'

function TicketItem({ ticket }) {
  const dispatch = useDispatch()
  
  const handleDelete = () => {
    if(window.confirm('are you sure?')) {
      dispatch(deleteTicket(ticket._id))
      toast.success('ticket deleted!')
    }
  }

  return (
    <div className="ticket">
        <div>{new Date(ticket.createdAt).toLocaleString('en-AE')}</div>
        <div>{ticket.product}</div>
        <div className={`status status-${ticket.status}`}>{ticket.status}</div>
        <Link to={`/ticket/${ticket._id}`} className="btn btn-reverse btn-sm">
            View
        </Link>
        <div>
          <button className="btn-delete" onClick={handleDelete}> < FaTimes style={{paddingTop: '4.5px'}} />Delete </button>
        </div>
      
    </div>
  )
}

export default TicketItem