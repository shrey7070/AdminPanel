var express = require('express');
var router = express.Router();
var productModel= require('../Schema/Product_table');
/* GET home page. */
router.get('/add_product', function(req, res, next) {
  res.render('Product_add');
});
router.post('/regi_process',function(req,res,next){
console.log(req.files.Pro_image);
console.log("-------------------");
    
var img = req.files.Pro_image;
var pro_image= img.name;
console.log("File Name :" +pro_image);    
console.log(req.body);
    const product_data=
    {
        Product_id     :  req.body.Product_id,
        Customer_id    :  req.body.Customer_id,
        Cate_id        :  req.body.Cate_id,
        Pro_name       :  req.body.Pro_name,
        Pro_image      :  pro_image,
        Pro_quantity   :  req.body.Pro_quantity,
        Pro_date       :  new Date(Date.now()).toLocaleString(),
        Pro_rentprice  :  req.body.Pro_rentprice,   
        Pro_ammount    :  req.body.Pro_ammount 
    }
        var productdata=productModel(product_data);  
        img.mv("public/Pro_upload/"+pro_image, function(err) {
            if (err)
            {
            return res.status(500).send(err);
            }
            else
            {
                productdata.save(function(err){
                if(err)
                console.log(err);
                else
                res.redirect('/product/add_product');
                });
            }
        });
});
    
//display data
router.get('/data_display',function(req,res,next){
    productModel.find(function(err,db_product_array){
        if(err)
        console.log("Error");
        else
        {
        console.log(db_product_array);
        res.render('Product_display',{product_array:db_product_array});
        }
    });
});
//display data

//delete data
router.get('/delete/:id',function(req,res){
    productModel.findByIdAndDelete(req.params.id,function(err,db_product_array){
        if(err)
        console.log("Error in delete data");
        else
        {
            console.log(db_product_array);
            res.redirect('/product/data_display');
        }
    });
});
//delete data
router.get('/edit/:id',function(req,res,next){
    productModel.findById(req.params.id,function(err,db_product_array){
        if(err)
        console.log("Error");
        else
        {
            console.log(db_product_array);
            res.render('Product_edit',{product_array:db_product_array});
        }
    });
});
router.post('/edit/:id',function(req,res){
    
    console.log("Edit ID is "+req.params.id);
    if(req.files.Pro_image)
    {
    var img = req.files.Pro_image;
    var pro_image= img.name;
    console.log("-----------------------------"+pro_image);
    console.log(pro_image);
    const product_data=
    {
        Product_id     :  req.body.Product_id,
        Customer_id    :  req.body.Customer_id,
        Cate_id        :  req.body.Cate_id,
        Pro_name       :  req.body.Pro_name,
        Pro_image      :  pro_image,
        Pro_quantity   :  req.body.Pro_quantity,   
        Pro_date       :  new Date(Date.now()).toLocaleString(),
        Pro_rentprice  :  req.body.Pro_rentprice,   
        Pro_ammount    :  req.body.Pro_ammount 
    }
    console.log("Update data is "+product_data);

    var productdata=productModel(product_data);  
        img.mv("public/Pro_upload/"+pro_image, function(err) {
            if (err)
            {
            return res.status(500).send(err);
            }
            else
            {
                productModel.findByIdAndUpdate(req.params.id,product_data,function(err){
                    if(err)
                    {
                        console.log(req.params.id);
                        console.log("Error in Record Update");
                    }
                else
                        res.redirect('/product/data_display');
                    });
            }
        });
    
}
else{
    console.log("-----------------------------------");
    var past_image=req.body.past_image;
    const product_data=
    {
        Product_id     :  req.body.Product_id,
        Customer_id    :  req.body.Customer_id,
        Cate_id        :  req.body.Cate_id,
        Pro_name       :  req.body.Pro_name,
        Pro_image      :  past_image,
        Pro_quantity   :  req.body.Pro_quantity,   
        Pro_date       :  new Date(Date.now()).toLocaleString(),
        Pro_rentprice  :  req.body.Pro_rentprice,   
        Pro_ammount    :  req.body.Pro_ammount 
    }
    console.log("Update data is "+product_data);

    var productdata=productModel(product_data);  
                productModel.findByIdAndUpdate(req.params.id,product_data,function(err){
                    if(err)
                    {
                        console.log(req.params.id);
                        console.log("Error in Record Update");
                    }
                else
                        res.redirect('/product/data_display');
                    });
    }

});
//edit data
//single-record
router.get('/show/:id',function(req,res){
    console.log(req.params.id);
    productModel.findById(req.params.id,function(err,db_product_array){
        if(err)
        console.log("Error in single Record Fetch");
        else
        {
            console.log(db_product_array);
            res.render('Product_singledata',{product_array:db_product_array});
        }
    });
});
//single-record
module.exports = router;