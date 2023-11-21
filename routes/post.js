const express = require('express');
const routes = express.Router();
const postController = require('../controllers/postController');
const path = require('path');
const Post = require('../models/Post');
routes.get('/',postController.firstpage )
routes.post('/insertData',Post.uploadImage, postController.addPostData);
routes.get('/ViewRecord', postController.viewPostData);
routes.get('/deletPostRecord/:id', postController.deletPostData);
routes.get('/updateRecord/:id',postController.updatePostData);
routes.post('/EditPostData',Post.uploadImage, postController.editPostData);
module.exports = routes;