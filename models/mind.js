let db = require('./db');

let Mind = db.model('mind', {
    content: String,
    nicename: String,
    number: String,
    photoId: String,
    createtime: {type: Date, default: Date.now}
});

module.exports = Mind;
