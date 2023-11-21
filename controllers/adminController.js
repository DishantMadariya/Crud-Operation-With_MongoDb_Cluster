const Student = require('../models/Student');
const path = require('path');
const fs = require('fs');

module.exports.firstPage = async(req,res)=>{
    return res.render('home');
}
module.exports.addData = async(req,res)=>{
    var imagePath = '';
    if(req.file){
        imagePath = Student.imgModel+'/'+req.file.filename;
    }
    req.body.avtar = imagePath;
    await Student.create(req.body);
    return res.redirect('/');
}
module.exports.viewData = async(req,res)=>{
    let data = await Student.find({});
    return res.render('view',{
        stData : data
    });
}
module.exports.deletRecord = async(req,res)=>{
    let oldData = await Student.findById(req.params.id);
    if(oldData){
       let fullPath = path.join(__dirname,'..',oldData.avtar);
       await fs.unlinkSync(fullPath); 
    }
    await Student.findByIdAndDelete(req.params.id);
    return res.redirect('back');
}
module.exports.updateRecord = async(req,res)=>{
    let record = await Student.findById(req.params.id);
    return res.render('update',{
        stUpdate : record,
    });
}
module.exports.editData = async(req,res)=>{
    let oldData = await Student.findById(req.body.EditId);
    if(req.file){
        if(oldData.avtar){
            let fullPath = path.join(__dirname,'..',oldData.avtar);
            await fs.unlinkSync(fullPath); 
        }
        var imagePath = '';
        imagePath = Student.imgModel+'/'+req.file.filename;
        req.body.avtar = imagePath;
    }
    else{;
        req.body.avtar = oldData.avtar;
    }
    await Student.findByIdAndUpdate(req.body.EditId, req.body);
    return res.redirect('/ViewRecord');
}