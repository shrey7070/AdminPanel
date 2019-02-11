var express= require('express');
var router=express.Router();
var categoryModel=  require('../Schema/Category_table');

router.get('/add_category',function(req,res,next){
    var mysessionvalue= req.session.Admin_email;
    if(!mysessionvalue){
        res.redirect('/');
    }
    res.render('Add_Category');
});

router.post('/cate_process',function(req,res,next){
    console.log(req.body);
    const Category_data={
        cate_id:req.body.cate_id,
        cate_name:req.body.cate_name
    }
    var cate_data=categoryModel(Category_data);
    cate_data.save(function(err){
        if(err){
            console.log("Error");
        }
        else{
            res.redirect('/category/add_category');
        }
    });
});
//display data
router.get('/data_display',function(req,res,next){
    var mysessionvalue= req.session.Admin_email;
    if(!mysessionvalue){
        res.redirect('/');
    }
    categoryModel.find(function(err,db_category_array){
        if(err)
        console.log("Error");
        else
        {
        console.log(db_category_array);
        res.render('Display_Category',{category_array:db_category_array});
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
    categoryModel.findByIdAndDelete(req.params.id,function(err,db_category_array){
        if(err)
        console.log("Error");
        else
        {
            console.log("-------------------------");
            console.log(db_category_array);
            res.redirect('/category/data_display');
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
    categoryModel.findById(req.params.id,function(err,db_category_array){
        if(err)
        console.log("Error");
        else
        {
            console.log(db_category_array);
            res.render('Category_edit',{category_array:db_category_array});
        }
    });
});
router.post('/edit/:id',function(req,res){
    console.log("Edit ID is"+req.params.id);
        const category_data={
            cate_id              :     req.body.cate_id,
            cate_name            :     req.body.cate_name,
            }
        categoryModel.findByIdAndUpdate(req.params.id,category_data,function(err){
            if(err)
            {
            console.log(req.params.id);
                console.log("Error in Record Update");
            }
        else
            res.redirect('/category/data_display');
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
    categoryModel.findById(req.params.id,function(err,db_category_array){
        if(err)
        console.log("Error in single Record Fetch");
        else
        {
            console.log(db_category_array);
            res.render('Category_singledata',{category_array:db_category_array});
        }
    })
})
//single-record


module.exports=router;