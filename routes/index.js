const express = require('express');
const routes = express.Router();
const adminController = require('../controllers/adminController');
const path = require('path');
const Student = require('../models/Student');

routes.get('/',adminController.firstPage);
routes.get('/ViewRecord',adminController.viewData);
routes.get('/deletRecord/:id', adminController.deletRecord);
routes.get('/updateRecord/:id',adminController.updateRecord)
routes.post('/insertData',Student.uploadImage,adminController.addData);
routes.post('/updateData',Student.uploadImage,adminController.editData);

module.exports = routes;