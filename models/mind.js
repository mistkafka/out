let db = require('./db');

let Mind = db.model('mind', {
    content: String,
    user: String,
    createtime: {type: Date, default: Date.now}
});

module.exports = Mind;
