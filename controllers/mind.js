let Mind = require('../models/mind');

let mindCtr = module.exports;

mindCtr.postMind = function(req, res) {
    let content = req.body.content;
    let newMind = new Mind({content: content, user: res.locals.email});

    newMind.save().then(function() {
        return Mind.count();
    }).then(function(count) {
        let random = Math.floor(Math.random() * count);
        return Mind
            .find({})
            .limit(1)
            .skip(random)
            .exec();
    }).then(function(minds) {
        return res.json({
            status: 'success',
            data: minds[0]
        });
    }).catch(function(err) {
        throw err;
    });
};

mindCtr.haveGotMind = function(req, res) {
    let _id = req.body.id;
};
