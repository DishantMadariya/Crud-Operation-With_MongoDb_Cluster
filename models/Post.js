const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const imgPath = "/uploads/postImages"
const postSchema = mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    postImage :{
        type : String,
        required : true
    }
});
const postStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,"..",imgPath));
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now());
    }
})
postSchema.statics.uploadImage = multer({storage : postStorage}).single('postImage');
postSchema.statics.imgModel = imgPath;
const Post = mongoose.model('Post',postSchema);
module.exports=Post;