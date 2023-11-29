const express = require('express')
const router = express.Router()
const { protected } = require('../middleware/authMiddleware')
const {getTickets, createTicket, getTicket, updateTicket, deleteTicket} = require('../controllers/ticketController')

// re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

router.route('/').get(protected, getTickets).post(protected, createTicket)

router.route('/:id').get(protected, getTicket).put(protected, updateTicket).delete(protected, deleteTicket)


module.exports = router