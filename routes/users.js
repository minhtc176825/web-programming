var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

// CRUD
router.get('/', userController.view)

router.post('/login', userController.login)

module.exports = router;
