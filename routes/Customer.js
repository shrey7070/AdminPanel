var express = require('express');
var router = express.Router();
var customerModel= require('../Schema/Customer_table');
var AdminModel= require('../Schema/Admin_table');
/* GET home page. */
router.get('/registration', function(req, res, next) {
    var mysessionvalue= req.session.Admin_email;
    if(!mysessionvalue){
        res.redirect('/');
    }
    res.render('Customer_registration');
});
router.post('/registration',function(req,res,next){
console.log(req.body);
const customer_data={
    Customer_id              :     req.body.Customer_id,
    Customer_name            :     req.body.Customer_name,
    Customer_contact_no      :     req.body.Customer_contact_no,
    Customer_email           :     req.body.Customer_email,
    Customer_address         :     req.body.Customer_address,
    Customer_dob             :     req.body.Customer_dob,
    Customer_gender          :     req.body.Customer_gender, 
    Customer_password        :     req.body.Customer_password
}
var customerdata=customerModel(customer_data);  
customerdata.save(function(err){
    if(err)
    console.log(err);
    else
    res.redirect('registration');
    });
});

//display data
router.get('/data_display',function(req,res,next){
    var mysessionvalue= req.session.Admin_email;
    if(!mysessionvalue){
        res.redirect('/');
    }
    customerModel.find(function(err,db_customer_array){
        if(err)
        console.log("Error");
        else
        {
        console.log(db_customer_array);
        res.render('Customer_display',{customer_array:db_customer_array});
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
    customerModel.findByIdAndDelete(req.params.id,function(err,db_customer_array){
        if(err)
        console.log("Error in delete data");
        else
        {
            console.log(db_customer_array);
            res.redirect('/customer/data_display');
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
    customerModel.findById(req.params.id,function(err,db_customer_array){
        if(err)
        console.log("Error");
        else
        {
            console.log("before edit : ",db_customer_array);
            res.render('Customer_edit',{customer_array:db_customer_array});
        }
    });
});
router.post('/edit/:id',function(req,res){
    console.log("Edit ID is"+req.params.id);
        const customer_data={
            Customer_id              :     req.body.Customer_id,
            Customer_name            :     req.body.Customer_name,
            Customer_contact_no      :     req.body.Customer_contact_no,
            Customer_email           :     req.body.Customer_email,
            Customer_address         :     req.body.Customer_address,
            Customer_dob             :     req.body.Customer_dob,
            Customer_gender          :     req.body.Customer_gender, 
            Customer_password        :     req.body.Customer_password,
        }
    customerModel.findByIdAndUpdate(req.params.id,customer_data,function(err){
            if(err)
            {
            console.log(req.params.id);
                console.log("Error in Record Update");
            }
        else
            res.redirect('/customer/data_display');
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
    customerModel.findById(req.params.id,function(err,db_customer_array){
        if(err)
        console.log("Error in single Record Fetch");
        else
        {
            console.log(db_customer_array);
            res.render('Customer_singledata',{customer_array:db_customer_array});
        }
    })
})
//single-record
module.exports = router;    