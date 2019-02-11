var mongoose= require('mongoose');
var schema=mongoose.Schema;
var Receiptdetails  = new schema({
    Receipt_id      : String,
    Payment_id      : String,
    Order_id        : String,
    Receipt_date    : Date
});
module.exports=mongoose.model('Receipt',Receiptdetails);