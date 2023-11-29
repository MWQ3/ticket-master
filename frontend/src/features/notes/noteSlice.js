import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import noteService from "./noteService"

const initialState = {
    notes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// get and show ticket notes
export const getNotes = createAsyncThunk(
    'notes/getAll',
    async (ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await noteService.getNotes(ticketId, token)
        } catch (error) {
            const message = 
                (error.response &&
                error.response.data &&
                error.response.data.message) || 
                error.message || 
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// create ticket notes
export const createNote = createAsyncThunk(
    'notes/create',
    async ({ticketId, noteText}, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await noteService.createNote(ticketId, noteText, token)
        } catch (error) {
            const message = 
                (error.response &&
                error.response.data &&
                error.response.data.message) || 
                error.message || 
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// update ticket notes
export const updateNote = createAsyncThunk(
    'notes/update',
    //
    async ({ticketId, noteId, noteText}, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            //
            return await noteService.updateNote(ticketId, noteText, noteId, token)
        } catch (error) {
            const message = 
                (error.response &&
                error.response.data &&
                error.response.data.message) || 
                error.message || 
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// delete ticket note
export const deleteNote = createAsyncThunk(
    'notes/delete',
    async ({ticketId, noteId}, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await noteService.deleteNote(ticketId, noteId, token)
        } catch (error) {
            const message = 
                (error.response &&
                error.response.data &&
                error.response.data.message) || 
                error.message || 
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getNotes.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getNotes.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.notes = action.payload
        })
        .addCase(getNotes.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(createNote.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createNote.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.notes.push(action.payload)
        })
        .addCase(createNote.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(updateNote.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateNote.fulfilled, (state, action) => {
            state.isLoading = false
            //
            let indexOfUpdatedNote = state.notes.indexOf(state.notes.find(n => n._id === action.payload._id))
            if (indexOfUpdatedNote > -1) {
                state.notes.splice(indexOfUpdatedNote, 1, action.payload)
            }
        })
        .addCase(updateNote.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteNote.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteNote.fulfilled, (state, action) => {
            const { noteId } = action.meta.arg
            state.isLoading= false
            state.notes = state.notes.filter((note) => note._id !== noteId);
        })
    }
})

export const {reset} = noteSlice.actions
export default noteSlice.reducer