const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const controller = require('../controllers/task');

//Set
router.use(bodyparser.urlencoded({ extended:  true }));

router.get('/fetchAll', controller.fetchAll);
router.post('/create', controller.create);
router.post('/update', controller.update);
router.post('/delete', controller.delete);

module.exports = router;
