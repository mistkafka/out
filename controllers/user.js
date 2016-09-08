let User = require('../models/user');
let Token = require('../models/token');
let hash = require('password-hash');
var tokenGenerator = require('random-token')
        .create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');

let userCtr = module.exports;

userCtr.login = function(req, res) {
    let nicename = req.body.nicename;

    User.findOne({nicename: nicename}).then(function(user) {
        if (!user) {
            let newUser = new User({nicename: nicename});
            return newUser.save();
        }

        // TODO: 用户需要做选择题来确定自己是第几个用户

        return user;
    }).then(function(user) {
        var newToken = new Token({
            token: Date.now() + tokenGenerator(17),
            nicename: user.nicename,
            number: user.number
        });
        return newToken.save();
    }).then(function(token) {
        return res.json({
            status: 'success',
            data: token
        });
    }).catch(function(err) {
        return res.json({
            status: 'failed',
            message: err.toString()
        });
    });
};

userCtr.auth = function(req, res, next) {
    let token = req.body.token || req.query.token;

    Token.findOne({token: token}).then((token) => {
        if (!token) {
            return Promise.reject('login required');
        }
        res.locals.nicename = token.nicename;
        res.locals.number = token.number;
        return next();

    }).catch((err) => {
        return res.json({
            status: 'failed',
            message: err.toString()
        });
    });
};
