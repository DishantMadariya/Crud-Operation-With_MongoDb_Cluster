const express = require('express');
const port =8004;
const app=express();
// const db = require('./config/mongoose');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://adishantpatel:DishArchie1630@dishant14.6tkvngs.mongodb.net/testing',{
    useUnifiedTopology : true,
    useNewUrlParser : true
}).then(()=>console.log("Database Connected")).catch(err => console.log(err));
const path = require('path');
const Student = require('./models/Student');
const { log } = require('console');
const fs =  require('fs')
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use('/', require('./routes'));
app.use('/post', require('./routes/post'));
app.listen(port,function(err){
    if(err){
        console.log("Shut Down");
    }
    console.log(`Server is connected on port:${port}`);
});
// app.post('/insertData',Student.uploadImage, async function(req,res){
//     var imagePath = '';
//     if(req.file){
//         imagePath = Student.imgModel+'/'+req.file.filename;
//     }
//     req.body.avtar = imagePath;
//     await Student.create(req.body);
//     return res.redirect('/');
    // let data = await Student.create(req.body);
    // if(data){
    //     console.log("Record Insert Succesfully");
    //     return res.redirect('/');
    // }
    // else{
    //     console.log("Something Went Wrong");
    //     return res.redirect('/');
    // }
    // console.log(req.body);
    // console.log(req.file);
// });
// app.get('/ViewRecord', async function(req,res){
//     let data = await Student.find({});
//     return res.render('view',{
//         stData : data
//     });
// });
// app.get('/deletRecord/:id', async function(req,res){
// let oldData = await Student.findById(req.params.id);
//     if(oldData){
//        let fullPath = path.join(__dirname,oldData.avtar);
//        await fs.unlinkSync(fullPath); 
//     }
//     await Student.findByIdAndDelete(req.params.id);
//     return res.redirect('back');
// });
// app.get('/updateRecord/:id', async function(req,res){
//     let record = await Student.findById(req.params.id);
//     return res.render('update',{
//         stUpdate : record,
//     });
// });
// app.post('/updateData',Student.uploadImage, async function(req,res){
//     let oldData = await Student.findById(req.body.EditId);
//     if(req.file){
//         if(oldData.avtar){
//             let fullPath = path.join(__dirname,oldData.avtar);
//             await fs.unlinkSync(fullPath); 
//         }
//         var imagePath = '';
//         imagePath = Student.imgModel+'/'+req.file.filename;
//         req.body.avtar = imagePath;
//     }
//     else{;
//         req.body.avtar = oldData.avtar;
//     }
//     await Student.findByIdAndUpdate(req.body.EditId, req.body);
//     return res.redirect('/ViewRecord');
// });