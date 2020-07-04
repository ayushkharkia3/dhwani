require('dotenv/config');
const path = require('path');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const multer = require('multer');
const MONGODB_URI = process.env.MONGODB_URI;

const indexRoutes = require('./routes/index');

const pathToImages = path.join(__dirname, './', 'images');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.access(pathToImages, function(err) {
            if (err && err.code === 'ENOENT') {
                fs.mkdir(pathToImages, function() {
                    cb(null, './images');
                });
            } else {
                cb(null, './images');
            }
        });
    },
    filename: (req, file, cb) => {
        cb(null, ((req.body.name) ? req.body.name : Math.random().toString(36).substring(3)) + (Math.random().toString(18).substring(3)) + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        req.validatesError = "Invalid";
        cb(null, false, new Error('Invalid'));
    }
};

const app = express();

app.use(helmet());


app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use('/images', express.static(pathToImages));

app.use(
    multer({
        storage: fileStorage,
        fileFilter: fileFilter
    }).fields([{ name: 'photo', maxCount: 1 }])
);

const PORT = process.env.PORT || 3000;

app.use(indexRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    return res.status(status).json({ message: message });
});


mongoose.connect(MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }).then(result => {
    app.listen(PORT, () => {
        console.log('SERVER RUNNING ON PORT', PORT);
    });
}).catch(err => { console.log(err) });