const Post = require('../models/Post');
const path = require('path');
const fs = require('fs');
const { post } = require('../routes');
module.exports.firstpage = async(req,res)=>{
    return res.render('post');
}
module.exports.addPostData = async(req,res)=>{
    var imagePath = '';
    if(req.file){
        imagePath = Post.imgModel+'/'+req.file.filename;
    }
    req.body.postImage = imagePath;
    await Post.create(req.body);
    return res.redirect('/post');
}
module.exports.viewPostData = async(req,res)=>{
    let Postdata = await Post.find({});
    return res.render('viewPost',{
        postData : Postdata
    });
}
module.exports.deletPostData = async(req,res)=>{
   try{
    let oldData = await Post.findById(req.params.id);
    if(oldData){
        var oldImage = oldData.postImage;
        if(oldImage){
            let fullPath = path.join(__dirname,'..',oldImage)
            await fs.unlinkSync(fullPath);
            let deletPostData = await Post.findByIdAndDelete(req.params.id);
            if(deletPostData){
                console.log("Record & Image Delet Succesfully");
                return res.redirect('back');
            }
            else{
                console.log("Record Delet Succesfully");
                return res.redirect('back');
            }
        }
        else{
            let deletPostData = await Post.findByIdAndDelete(req.params.id);
            if(deletPostData){
                console.log("Post Data Delet");
                return res.redirect('back');
            }
            else{
                console.log("POst Record Delet");
                return res.redirect('back');
            }
        }
    }
    else{
        console.log("Record Not Found");
        return res.redirect('back');
    }
   }
   catch(err){
    console.log(err);
    return res.redirect('back');
   }
}
module.exports.updatePostData = async(req,res)=>{
    try{
        let record = await Post.findById(req.params.id);
            if(record){
                return res.render('updatePost',{
                    postUpdate : record
                });
            }
            else{
                console.log("Record Not Found");
                return res.redirect('back');
            }
    }
    catch(err){
        console.log(err);
        return res.redirect('back')
    }
}
module.exports.editPostData = async(req,res)=>{
   try{
        if(req.file){
            let oldData = await Post.findById(req.body.EditId);
            if(oldData){
                if(oldData.postImage){
                    let fullPath = path.join(__dirname,'..',oldData.postImage);
                    await fs.unlinkSync(fullPath);
                }
                var imagePath = Post.imgModel+'/'+req.file.filename;
                req.body.postImage = imagePath;
                let ep = await Post.findByIdAndUpdate(req.body.EditId,req.body);
                if(ep){
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/post/viewRecord');
                }
                else{
                    console.log("Record Not Updated");
                    return res.redirect('/post/viewRecord');
                }
            }
            else{
                console.log("Record Not Updated");
                return res.redirect('/post/viewRecord');
            }
        }
        else{
            let oldData = await Post.findById(req.body.EditId);
            if(oldData){
                req.body.postImage = oldData.postImage;
                let ep = await Post.findByIdAndUpdate(req.body.EditId,req.body);
                if(ep){
                    console.log('Record & image Update Succesfully');
                    return res.redirect('/post/viewRecord');
                }
                else{
                    console.log("Record Not Updated");
                    return res.redirect('/post/viewRecord');
                }
            }
            else{
                console.log("Record Not Updated");
                return res.redirect('/post/viewRecord');
            }
        }
   }
   catch(err){
    console.log(err)
    return res.redirect('/post/ViewRecord');
   }
}