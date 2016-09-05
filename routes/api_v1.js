let express = require('express');
let router = express.Router();

let mind = require('../controllers/mind');

router.post('/mind', mind.postMind);

module.exports = router;
