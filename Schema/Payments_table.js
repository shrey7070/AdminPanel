var mongoose= require('mongoose');
var schema=mongoose.Schema;
var Payments  = new schema({
    Payment_id      : String,
    Order_id        : String,
    Receipt_id      : String,
    Payment_date    : Date,
    Payment_staus   :Boolean,
    Payment_type    :String  
});
module.exports=mongoose.model('Payment',Payments);