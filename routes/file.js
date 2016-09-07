let express = require('express');
let path = require('path');
let app = express();
let multer = require('multer');
const FILE_PATH = path.join(__dirname, '../public/uploads/photo');
let uploader = multer({dest: FILE_PATH});
// let uploader = multer({dest: 'uploads/photo'});

app.post('/photo', uploader.single('photo'), function (req, res) {
    console.log(req.file);
    res.json({
        status: 'success',
        data: req.file.filename
    });
});

app.get('/photo', function (req, res) {
    let photoId = req.query.photoId || req.body.photoId;
    res.sendFile(path.join(FILE_PATH, photoId));
});

module.exports = app;
