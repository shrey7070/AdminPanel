var mongoose= require('mongoose');
var schema=mongoose.Schema;
var Productdetails  = new schema({
    Product_id     : String,
    Customer_id    : String,
    Cate_id        : String,
    Pro_name       : String,
    Pro_image      : String,
    Pro_quantity   : Number,   
    Pro_date       : Date,  
    Pro_rentprice  : Number,   
    Pro_ammount    : Number   
});
module.exports=mongoose.model('Product',Productdetails);