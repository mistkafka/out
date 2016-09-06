let db = require('./db');
let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    token: String,
    email: String,
    type: {type: String, default: 'auth'},
    createtime: {type: Date, default: Date.now}
});

let Token = db.model('token', schema);

module.exports = Token;
