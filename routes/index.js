var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var MONGO_URL = 'mongodb://45.33.110.211:1777/out';

function insertMind(db, mind, cb) {
    // Get the documents collection
    var collection = db.collection('minds');
    // Insert some documents
    collection.insertMany([
        mind
    ], function(err, result) {
        cb(result);
    });
};

var findMinds = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('minds');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        callback(docs);
    });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to OUT' });
});

router.post('/rest/mind', function(req, res, next) {
    MongoClient.connect(MONGO_URL, function(err, db) {
        insertMind(db, req.body, function() {
            db.close();
            res.send('ok');
        });
    });
});

router.get('/rest/mind', function(req, res, next) {
    MongoClient.connect(MONGO_URL, function(err, db) {
        findMinds(db, function(minds) {
            db.close();
            var index = Math.floor(Math.random() * 1000) % minds.length;
            res.send(minds[index]);
        });
    });
});

module.exports = router;
