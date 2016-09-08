let db = require('./db');
let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    nicename: String,
    number: {type: Number, default: 1},
    createtime: {type: Date, default: Date.now}
});

let User = db.model('user', schema);

module.exports = User;
