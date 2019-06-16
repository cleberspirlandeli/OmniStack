const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const UsersController = require('./controller/UsersController');
const PostController = require('./controller/PostController');
const LikeController = require('./controller/LikeController');


const routes = express.Router();
const upload = multer(uploadConfig);


// Users
routes.get('/users', UsersController.index);
routes.get('/users/active', UsersController.active);
routes.post('/users/register', UsersController.register);
routes.post('/users/authentication', UsersController.authentication);



// Feed
routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);



// Like Post Feed
routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;