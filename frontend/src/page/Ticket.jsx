import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getTicket, closeTicket } from "../features/tickets/ticketSlice"
import { getNotes, createNote, updateNote, deleteNote } from '../features/notes/noteSlice'
import { toast } from "react-toastify"
import { FaPlus } from "react-icons/fa"
import Modal from 'react-modal'
import BackButton from "../components/BackButton"
import Loading from "../components/Loading"
import NoteItem from "../components/NoteItem"

const customStyles = {
    content: {
      width: '600px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'relative',
    },
}

Modal.setAppElement('#root')

function Ticket() {
    const [modalControl, setModalControl] = useState(false)
    const [noteText, setNoteText] = useState('')
    const [editBtn, setEditBtn] = useState(false)
    const [noteId, setNoteId] = useState(null)

    const {user} = useSelector((state) => state.auth)

    const {isLoading, isError, message, ticket} = useSelector((state) => state.ticket)

    const {isLoading: noteLoading, notes} = useSelector((state) => state.note)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const {ticketId} = params

    useEffect(() => {
        if(isError) {
            toast.error(message)   
        }

        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))
        // eslint-disable-next-line
    }, [isError, message, ticketId])

    const handleCloseTicket = () => {
        if(window.confirm('are you sure?')) {
            dispatch(closeTicket(ticketId))
            toast.success('Ticket Closed')
            navigate('/tickets')
        }
    }

    const handleEdit = (noteText, noteIndex) => {
        setModalControl(true)
        setEditBtn(true)
        setNoteText(noteText)
        setNoteId(notes[noteIndex]._id)
        console.log(notes[noteIndex]._id)
    }

    const handleDelete = (noteId, noteIndex) => { 
        if(window.confirm('are you sure?')) {
        dispatch(deleteNote({ticketId, noteId}))
        }

        console.log(notes[noteIndex]._id)
    }

    // open/close modal
    const openModal = () => {
        return (
        setModalControl(true),
        setEditBtn(false),
        setNoteText('')
        )
    }
    const closeModal = () => { 
        return (
        setModalControl(false),
        setEditBtn(false)        
        )
    }
    const handleNoteSubmit = (e) => {
        e.preventDefault()

        if(noteText === '') {
            toast.error('enter text before submitting')
        } else if(!editBtn && notes.length <= 4) {
            dispatch(createNote({ticketId, noteText}))
            closeModal()
        } else if(editBtn) {
            const noteBeingEdited = notes.find((note) => note._id === noteId)
            if(noteBeingEdited.text !== noteText) {
                dispatch(updateNote({ticketId, noteText, noteId}))
                closeModal()
            } else {
                toast.error('you cannot send the same message unedited')
            }
        } else if (!editBtn && notes.length > 4) {
            toast.error('you cannot add more than 5 notes')
            closeModal()
        }
    }

    if(isLoading || noteLoading) {
        return < Loading />
    }

    if(isError) {
        return <h2>Ops, Page not found!!</h2>
    }

  return (
    <div className="ticket-page">
        <header className="ticket-header">
            < BackButton url='/tickets' />
            <h2>
                Ticket ID: {ticket._id}
                <span className={`status status-${ticket.status}`}>{ticket.status}</span>
            </h2>
            <h3>
                Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-AE')}
            </h3>
            < hr />
            <h3>Product: {ticket.product}</h3>
            <div className="ticket-desc">
                <h3>Description of the issue</h3>
                <p>{ticket.description}</p>
            </div>
            <h2>Notes</h2>
        </header>

        {ticket.status !== 'closed' && (
            <button className="btn" onClick={openModal}> < FaPlus /> Add Note</button>
        )}

        <Modal 
        isOpen={modalControl} 
        onRequestClose={closeModal} 
        style={customStyles}
        contentLabel="Add Note">
            <h2>Add Note</h2>
            <button className="btn-close" onClick={closeModal}>X</button>

            <form onSubmit={handleNoteSubmit}>
                <div className="form-group">
                    <textarea 
                    name="noteText" 
                    id="noteText"
                    className="form-control"
                    placeholder="Note Content"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <button className="btn" type="sbumit">{editBtn ? 'Edit Note' : 'Submit'}</button>
                </div>
            </form>
        </Modal>

        {notes.map((note, index) => {
            return < NoteItem key={note._id} note={note} userInfo={user} handleEdit={() => handleEdit(note.text, index)} handleDelete={() => handleDelete(noteId, index)} />
        })}

        {ticket.status !== 'closed' && (
            <button onClick={handleCloseTicket} className="btn btn-block btn-danger">Close Ticket</button>
        )}
    </div>
  )
}

export default Ticket