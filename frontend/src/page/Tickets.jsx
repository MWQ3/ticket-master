import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTickets, reset } from "../features/tickets/ticketSlice"
import BackButton from "../components/BackButton"
import Loading from "../components/Loading"
import TicketItem from "../components/TicketItem"

function Tickets() {
  const {isLoading, isSuccess, tickets} = useSelector((state) => state.ticket)
  const dispatch = useDispatch()
  
  useEffect(() => {
    return () => {
        if(isSuccess) {
            dispatch(reset())
        }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getTickets())
  }, [dispatch])

  if(isLoading) {
    < Loading />
  }

  return (
      <>
      < BackButton url='/' />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
            <div>Date</div>
            <div>Product</div>
            <div>Status</div>
            <div></div>
        </div>
        {tickets.map((ticket) => {
            return < TicketItem key={ticket._id} ticket={ticket} />
        })}
      </div>
      </>
  )
}

export default Tickets