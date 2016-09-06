let User = require('../models/user');
let Token = require('../models/token');
let hash = require('password-hash');
var tokenGenerator = require('random-token')
        .create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');

let userCtr = module.exports;

userCtr.register = function(req, res) {
    let email = req.body.email;
    let password = hash.generate(req.body.password);
    let newUser = new User({email: email, password: password});

    newUser.save().then(function() {
        return res.json({
            status: 'success',
            data: ''
        });
    }).catch(function(err) {
        return res.json({
            status: 'failed',
            message: err.toString()
        });
    });
};

userCtr.login = function(req, res) {
    User.findOne({email: req.body.email}).then(function(user) {
        if (!user) {
            return Promise.reject('User is not exist!');
        }

        if (!hash.verify(req.body.password, user.password)) {
            return Promise.reject('Wrong password!');
        }

        var newToken = new Token({
            token: Date.now() + tokenGenerator(17),
            email: req.body.email
        });
        return newToken.save();
    }).then(function(token) {
        return res.json({
            status: 'success',
            data: {
                token: token
            }
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
        res.locals.email = token.email;
        return next();

    }).catch((err) => {
        return res.json({
            status: 'failed',
            message: err.toString()
        });
    });
};

userCtr.isEmailExist = function(req, res, next) {
    User.findOne({email: req.body.email}).then(function(user) {
        if (!user) {
            return res.json({
                status: 'success',
                data: 'email is available!'
            });
        } else {
            return res.json({
                status: 'failed',
                message: 'email is exist!'
            });
        }
    });
};
