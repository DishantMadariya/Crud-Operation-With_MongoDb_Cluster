const mongoose = require('mongoose');
const multer = require('multer');
const imgPath = "/uploads"
const path = require('path');
const StudentDetail = mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    age :{
        type : Number,
        required : true
    },
    gender :{
        type : String,
        required : true
    },
    hobby :{
        type : Array,
        required : true
    },
    city :{
        type : String,
        required : true
    },
    avtar :{
        type : String,
        required : true
    }
});
const imgStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,"..",imgPath));
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now());
    }
});
StudentDetail.statics.uploadImage = multer({storage : imgStorage}).single('avtar');
StudentDetail.statics.imgModel = imgPath;
const Student = mongoose.model('Student',StudentDetail);
module.exports=Student;