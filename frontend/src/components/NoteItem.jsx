import { FaEdit, FaTimes } from 'react-icons/fa'

function NoteItem({ note, userInfo, handleEdit, handleDelete }) {
  


  return (
    <div className="note" style={{
        backgroundColor: note.isStaff ? 'rgba(0, 0, 0, 0.7)' : '#fff',
        color: note.isStaff ? '#fff' : '#000'
    }}>

        <h3>Note from {note.isStaff ? <span>'Staff'</span> : <span>{userInfo.name}</span>}</h3>
        <p>{note.text}</p>

        <div className="note-date">
          {note.createdAt !== note.updatedAt ? (new Date(note.updatedAt).toLocaleString('en-AE')) : (new Date(note.createdAt).toLocaleString('en-AE'))}
        </div>

        <button className='btn-delete-note' onClick={handleDelete}> < FaTimes /> </button>

        <button className='btn-edit' onClick={handleEdit}> < FaEdit /> </button>
        
    </div>
  )
}

export default NoteItem