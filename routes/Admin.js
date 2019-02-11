var express = require('express');
var router = express.Router();
var AdminRegistrationModel= require('../Schema/Admin_table');
/* GET home page. */
//Admin Registration
router.get('/registration', function(req, res, next) {
    res.render('Admin_registration');
});
router.post('/registration',function(req,res,next){
console.log(req.body);
const admindata={
    Admin_id:           req.body.Admin_id,
    Admin_name:         req.body.Admin_name,
    Admin_contact_no:   req.body.Admin_contact_no,
    Admin_email:        req.body.Admin_email,
    Admin_password:     req.body.Admin_password
}
var registrationdata=AdminRegistrationModel(admindata);  
registrationdata.save(function(err){
        if(err)
        console.log("Error");
        else
        res.redirect('/admin/data_display');
    });
});
//Admin Registration

//display data
router.get('/data_display',function(req,res,next){
    var mysessionvalue= req.session.Admin_email;
    if(!mysessionvalue){
        res.redirect('/');
    }
    AdminRegistrationModel.find(function(err,db_admin_array){
        if(err)
        console.log("Error");
        else
        {
        console.log(db_admin_array);
        res.render('Admin_display',{admin_array:db_admin_array});
        }
    });
});
//display data

//delete data
router.get('/delete/:id',function(req,res){
    var mysessionvalue= req.session.Admin_email;
    if(!mysessionvalue){
        res.redirect('/');
    }
    AdminRegistrationModel.findByIdAndDelete(req.params.id,function(err,db_admin_array){
        if(err)
        console.log("Error");
        else
        {
            console.log("-------------------------");
            console.log(db_admin_array);
            res.redirect('/admin/data_display');
        }
    });
});
//delete data

//edit data
router.get('/edit/:id',function(req,res,next){
    var mysessionvalue= req.session.Admin_email;
    if(!mysessionvalue){
        res.redirect('/');
    }
    AdminRegistrationModel.findById(req.params.id,function(err,db_admin_array){
        if(err)
        console.log("Error");
        else
        {
            console.log(db_admin_array);
            res.render('Admin_edit',{admin_array:db_admin_array});
        }
    });
});
router.post('/edit/:id',function(req,res){
    console.log("Edit ID is"+req.params.id);
    const admindata={
        Admin_id:           req.body.Admin_id,
        Admin_name:         req.body.Admin_name,
        Admin_contact_no:   req.body.Admin_contact_no,
        Admin_email:        req.body.Admin_email,
        Admin_password:     req.body.Admin_password
    }
    AdminRegistrationModel.findByIdAndUpdate(req.params.id,admindata,function(err){
            if(err)
            {
            console.log(req.params.id);
                console.log("Error in Record Update");
            }
        else
            res.redirect('/admin/data_display');
        });
    });    
//edit data

//single-record
router.get('/show/:id',function(req,res){
    var mysessionvalue= req.session.Admin_email;
    if(!mysessionvalue){
        res.redirect('/');
    }
    console.log(req.params.id);
    AdminRegistrationModel.findById(req.params.id,function(err,db_admin_array){
        if(err)
        console.log("Error in single Record Fetch");
        else
        {
            console.log(db_admin_array);
            res.render('Admin_singledata',{admin_array:db_admin_array});
        }
    });
});
//single-record

module.exports = router;