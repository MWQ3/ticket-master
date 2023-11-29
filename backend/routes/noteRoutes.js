const express = require('express')
const router = express.Router({ mergeParams: true })
const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/noteController')
const { protected } = require('../middleware/authMiddleware')

router.route('/').get(protected, getNotes).post(protected, createNote)
router.route('/:noteId').put(protected, updateNote).delete(protected, deleteNote)
module.exports = router