var express= require('express');
var router=express.Router();
var categoryRouter=require('../Schema/Category_table');
var subcategoryModel=  require('../Schema/SubCategory_table');
//add-subcategory
router.get('/add_subcategory',function(req,res,next){
    var mysessionvalue= req.session.Admin_email;
    if(!mysessionvalue){
        res.redirect('/');
    }
    categoryRouter.find(function(err , db_category_array){
        if(err)
        {
            console.log("Error");
        }
        else
        {
            console.log(db_category_array);
            res.render('SubCategory_Add',{  category_array  : db_category_array  } );
        }
    });
});

router.post('/subcate_process', function(req, res, next) {
    console.log(req.body);
    const subcategorydata={
        subcate_id:req.body.subcate_id,
        subcate_name:req.body.subcate_name,
        _category:req.body._category
    }
    console.log(subcategorydata);
    var subcatedata=subcategoryModel(subcategorydata);
    subcatedata.save(function(err){
        if(err)
        console.log("Error In Subcategory");
        else
        {
            console.log("Data Saved");
            res.redirect('/subcategory/add_subcategory');
        }
        
    });
});
//add-subcategory
//data display
router.get('/data_display',function(req,res,next){
    var mysessionvalue= req.session.Admin_email;
    if(!mysessionvalue){
        res.redirect('/');
    }
    subcategoryModel.find(function(err, db_subcategory_array){
    console.log(db_subcategory_array);
    if (err) res.json({message: 'There are no posts here.'});
    subcategoryModel.find({})
    .populate('_category')
    .exec(function(err,db_subcategory_array)    
            {
                console.log(db_subcategory_array);
                res.render('SubCategory_display', { subcategory_array : db_subcategory_array});
            })
    });
});
//data display
//delete data
router.get('/delete/:id',function(req,res){
    var mysessionvalue= req.session.Admin_email;
    if(!mysessionvalue){
        res.redirect('/');
    }
    subcategoryModel.findByIdAndDelete(req.params.id,function(err,db_subcategory_array){
        if(err)
        console.log("Error");
        else
        {
            console.log("-------------------------");
            console.log(db_subcategory_array);
            res.redirect('/subcategory/data_display');
        }
    });
});
//edit data
router.get('/edit/:id',function(req,res,next){
    var mysessionvalue= req.session.Admin_email;
    if(!mysessionvalue){
        res.redirect('/');
    }
    subcategoryModel.findById(req.params.id,function(err,db_subcategory_array,){
        categoryRouter.find(function(err,db_category_array){

            console.log('--------------------------------------------------');
            console.log(db_subcategory_array);
            if(err){
                console.log("Error in Edit Subcategory");
            }   
            else     
            {        
                    console.log('--------------------------------------------------');
                    console.log(db_subcategory_array);
                    console.log(db_category_array);
                    res.render('SubCategory_edit', { subcategory_array : db_subcategory_array,category_array:db_category_array});
            }
        })
    });
});
router.post('/edit/:id',function(req,res){
    console.log("Edit ID is"+req.params.id);
        const subcategory_data={
            subcate_id              :     req.body.subcate_id,
            subcate_name            :     req.body.subcate_name,
            _category               :     req.body.category,
            }
        subcategoryModel.findByIdAndUpdate(req.params.id,subcategory_data,function(err){
            if(err)
            {
            console.log(req.params.id);
                console.log("Error in Record Update");
            }
        else
            res.redirect('/subcategory/data_display');
        });
    }); 
//edit data
//single-record
router.get('/show/:id',function(req,res,next){
    console.log(req.params.id);
    subcategoryModel.findById(req.params.id,function(err,db_subcategory_array){     
                    console.log('--------------------------------------------------');
                    console.log(db_subcategory_array);
                    if (err) res.json({message: 'There are no posts here.'});
                    subcategoryModel.findOne({})
                    .populate('_category')
                    .exec(function(err,db_subcategory_array)    
                            {        
                            console.log('--------------------------------------------------');
                            console.log(db_subcategory_array);
                            res.render('SubCategory_singledata', { subcategory_array : db_subcategory_array});
                        })
                });  
    });
//single-record
module.exports=router;