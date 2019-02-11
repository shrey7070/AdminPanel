var mongoose= require('mongoose');
var schema=mongoose.Schema;
var Orderdetails  = new schema({
    O_details_id       : String,
    Order_id           : String,
    Product_id         : String,
    Pro_quantity       : String,
    Pro_returndata     : Date   
});
module.exports=mongoose.model('Order_details',Orderdetails);