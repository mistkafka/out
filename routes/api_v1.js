let express = require('express');
let router = express.Router();

let mind = require('../controllers/mind');
let user = require('../controllers/user');

router.post('/mind', user.auth, mind.postMind);
router.post('/user/login', user.login);

module.exports = router;
