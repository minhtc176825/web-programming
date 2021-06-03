var express = require('express');
var router = express.Router();
const homeController = require('../controllers/homeController')


router.get('/', (req, res) => {
    res.render('index', {response: true})
})

router.post('/home', homeController.login)

// Reload homepage
router.get('/home:id', homeController.view)

// Search
router.post('/', homeController.search)




module.exports = router;
