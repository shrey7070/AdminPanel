var express = require('express');
var router = express.Router();
var inqueryModel= require('../Schema/Inquery_table');
/* GET home page. */
router.get('/registration', function(req, res, next) {
  res.render('Inquery_registration');
});
router.post('/regi_process',function(req,res,next){
console.log(req.body);
const inquery_data={
    inq_id          : req.body.inq_id,
    customer_id     : req.body.customer_id,
    inq_date        : new Date(Date.now()).toLocaleString(),
    inq_question : req.body.inq_question,
    inq_answer : req.body.inq_answer
}
var inquerydata=inqueryModel(inquery_data);  
inquerydata.save(function(err){
    if(err)
    console.log(err);
    else
    res.redirect('registration');
    });
});

//display data
router.get('/data_display',function(req,res,next){
    inqueryModel.find(function(err,db_inquery_array){
        if(err)
        console.log("Error");
        else
        {
        console.log(db_inquery_array);
        res.render('inquery_display',{inquery_array:db_inquery_array});
        }
    });
});
//display data

//delete data
router.get('/delete/:id',function(req,res){
    inqueryModel.findByIdAndDelete(req.params.id,function(err,db_inquery_array){
        if(err)
        console.log("Error in delete data");
        else
        {
            console.log(db_inquery_array);
            res.redirect('/inquery/data_display');
        }
    });
});
//delete data
router.get('/edit/:id',function(req,res,next){
    inqueryModel.findById(req.params.id,function(err,db_inquery_array){
        if(err)
        console.log("Error");
        else
        {
            console.log("before edit display : ",db_inquery_array);
            res.render('inquery_edit',{inquery_array:db_inquery_array});
        }
    });
});
router.post('/edit/:id',function(req,res){
    console.log("Edit ID is"+req.params.id);
    const inquery_data={
        inq_id          : req.body.inq_id,
        customer_id     : req.body.customer_id,
        inq_date        : new Date(Date.now()).toLocaleString(), 
        inq_question : req.body.inq_question,
        inq_answer : req.body.inq_answer
    }
    inqueryModel.findByIdAndUpdate(req.params.id,inquery_data,function(err){
            if(err)
            {
            console.log(req.params.id);
                console.log("Error in Record Update");
            }
        else
            res.redirect('/inquery/data_display');
        });
    });    
//edit data


module.exports = router;    