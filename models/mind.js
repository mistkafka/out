let db = require('./db');

let Mind = db.model('mind', {
    content: String,
    user: String,
    photoId: String,
    createtime: {type: Date, default: Date.now}
});

module.exports = Mind;
