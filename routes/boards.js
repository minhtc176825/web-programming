const express = require('express')
const router = express.Router()
const boardController = require('../controllers/boardController')


router.get('/:id', boardController.view)
// Add new board
// router.post('/', boardController.insert)
module.exports = router