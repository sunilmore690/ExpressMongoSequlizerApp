var express = require('express');
var router = express.Router();

let user_controller = require('../controller/user')
/* GET users listing. */
router.post('/', user_controller.create)
router.get('/', user_controller.index)
router.get('/:id', user_controller.show)
router.put('/:id', user_controller.update)
router.delete('/:id', user_controller.destroy)
router.post('/login',user_controller.authenticate)
module.exports = router;
