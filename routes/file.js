let express = require('express');
let path = require('path');
let app = express();
let multer = require('multer');
const SRC_2_FILE_PATH_MAPPING = {
	system: '../public/images',
	user: '../public/uploads/photo'
};
const DEFAULT_FILE_PATH = SRC_2_FILE_PATH_MAPPING['user'];
let uploader = multer({dest: path.join(__dirname, DEFAULT_FILE_PATH)});

app.post('/photo', uploader.single('photo'), function (req, res) {
    console.log(req.file);
    res.json({
        status: 'success',
        data: {photoId: req.file.filename}
    });
});

app.get('/photo', function (req, res) {
    let photoId = req.query.photoId || req.body.photoId;
	let photoSrc = req.query.photoSrc || req.body.photoSrc;
	let filePath = SRC_2_FILE_PATH_MAPPING[photoSrc || 'user'] || DEFAULT_FILE_PATH;

    res.sendFile(path.join(__dirname, filePath, photoId));
});

module.exports = app;
