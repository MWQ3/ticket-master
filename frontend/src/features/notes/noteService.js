import axios from 'axios'

const API_URL = '/api/tickets/'

const getNotes = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + ticketId + '/notes', config)
    
    return response.data
}

const createNote = async (ticketId, noteText, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + ticketId + '/notes', {text: noteText}, config)
    
    return response.data
}

const updateNote = async (ticketId, noteText, noteId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(`${API_URL}${ticketId}/notes/${noteId}`, {text: noteText}, config)
    
    return response.data
}

const deleteNote = async (ticketId, noteId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    // eslint-disable-next-line
    const response = await axios.delete(`${API_URL}${ticketId}/notes/${noteId}`, config)
}

const noteService = {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
}

export default noteService