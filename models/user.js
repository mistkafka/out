let db = require('./db');
let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    email: String,
    nicename: String,
    password: String,
    createtime: {type: Date, default: Date.now}
});

let User = db.model('user', schema);

module.exports = User;
