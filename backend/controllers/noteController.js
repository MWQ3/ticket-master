const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')

// @desc    get ticket note
// @route   GET api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
    // get user id by JWT 
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(400)
        throw new Error('No Logged-in User, Please Log-in or Sign-up')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if(ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    const notes = await Note.find({ ticket: req.params.ticketId })

    res.status(200).json(notes)
})

// @desc    create ticket note
// @route   POST api/tickets/:ticketId/notes
// @access  Private
const createNote = asyncHandler(async (req, res) => {
    // get user id by JWT 
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(400)
        throw new Error('No Logged-in User, Please Log-in or Sign-up')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if(ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    const note = await Note.create({ 
        ticket: req.params.ticketId,
        text: req.body.text,
        isStaff: false,
        user: req.user.id, 
    })

    res.status(200).json(note)
})

// @desc    update ticket note
// @route   PUT api/ticket/:id/notes/:noteId
// @access  Private
const updateNote = asyncHandler(async (req, res) => {
    // get user id by JWT 
    const user = await User.findById(req.user.id)
    // const note = await Note.findById(req.note.id)

    if(!user) {
        res.status(400)
        throw new Error('No Logged-in User, Please Log-in or Sign-up')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if(!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }
    //
    const updateNote = await Note.findByIdAndUpdate(req.params.noteId, { text: req.body.text }, { new: true })

    if (updateNote?._id) {
        res.status(200).json(updateNote)
    } else {
        res.status(404)
        throw new Error('Note not found')
    }
})

// @desc    delete ticket note
// @route   DELETE api/ticket/:id/notes/noteId
// @access  Private
const deleteNote = asyncHandler(async (req, res) => {
    // get user id by JWT 
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(400)
        throw new Error('No Logged-in User, Please Log-in or Sign-up')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if(!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    const note = Note.findById(req.params.noteId)

    await note.deleteOne()


    res.status(200).json({ success: true })
})


module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
}