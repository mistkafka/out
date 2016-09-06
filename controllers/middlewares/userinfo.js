let Token = require('../models/token');

module.exports = function(req, res, next) {
    let token = req.body.token || req.query.token;
    res.locals.email = null;

    Token.findOne({token: token}).then((token) => {
        if (token) {
            res.locals.email = token.email;
        }

        return next();
    }).catch((err) => {
        return res.json({
            status: 'failed',
            message: err.toString()
        });
    });
};
