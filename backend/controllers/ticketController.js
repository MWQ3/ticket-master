const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc    get user tickets
// @route   GET api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
    // get user id by JWT 
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(400)
        throw new Error('No Logged-in User, Please Log-in or Sign-up')
    }

    const tickets = await Ticket.find({ user: req.user.id })

    res.status(200).json(tickets)
})

// @desc    get user ticket
// @route   GET api/ticket/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
    // get user id by JWT 
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(400)
        throw new Error('No Logged-in User, Please Log-in or Sign-up')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    res.status(200).json(ticket)
})

// @desc    create new user ticket
// @route   POST api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body

    if(!product || !description) {
        res.status(400)
        throw new Error('Please select a product & add description of the problem')
    }

    // get user id by JWT 
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(400)
        throw new Error('No Logged-in User, Please Log-in or Sign-up')
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })

    res.status(201).json(ticket)
})

// @desc    update ticket
// @route   PUT api/ticket/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
    // get user id by JWT 
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(400)
        throw new Error('No Logged-in User, Please Log-in or Sign-up')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    const updateTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })


    res.status(200).json(updateTicket)
})

// @desc    delete ticket
// @route   DELETE api/ticket/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
    // get user id by JWT 
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(400)
        throw new Error('No Logged-in User, Please Log-in or Sign-up')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }


    await ticket.deleteOne()


    res.status(200).json({ success: true })
})



module.exports = {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket,
}