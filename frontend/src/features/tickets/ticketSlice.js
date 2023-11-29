import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import ticketService from './ticketService'

const initialState = {
    tickets: [],
    ticket: {},
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: '',
}

// create new ticket
export const createTicket = createAsyncThunk(
    'tickets/create',
    async (ticketData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.createTicket(ticketData, token)
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

// get user tickets
export const getTickets = createAsyncThunk(
    'tickets/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.getTickets(token)
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

// show user ticket
export const getTicket = createAsyncThunk(
    'ticket/get',
    async (ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.getTicket(ticketId, token)
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

// delete ticket
export const deleteTicket = createAsyncThunk(
    'ticket/delete',
    async (ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.deleteTicket(ticketId, token)
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

// close ticket
export const closeTicket = createAsyncThunk(
    'tickets/close',
    async (ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.closeTicket(ticketId, token)
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

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createTicket.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createTicket.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(createTicket.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getTickets.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getTickets.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            // pushing the results (data) to the empty tickets array in initialState
            state.tickets = action.payload
        })
        .addCase(getTickets.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getTicket.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getTicket.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            // pushing the results (data) to the empty ticket object in initialState
            state.ticket = action.payload
        })
        .addCase(getTicket.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteTicket.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteTicket.fulfilled, (state, action) => {
            const deletedTicketId = action.meta.arg
            state.isLoading = false
            state.tickets = state.tickets.filter((ticket) => ticket._id !== deletedTicketId);
            state.tickets.map((ticket) => ticket)
        })
        .addCase(closeTicket.fulfilled, (state, action) => {
            state.isLoading = false
            state.ticket = action.payload
            state.tickets = state.tickets.map((ticket) =>
            ticket._id === action.payload._id ? action.payload : ticket
        )
        })
    },
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer