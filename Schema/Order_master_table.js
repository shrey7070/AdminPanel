var mongoose= require('mongoose');
var schema=mongoose.Schema;
var Order_master  = new schema({
    Order_id          : String,
    customer_id       : String,
    O_place_date      : Date,
    O_ship_date       : Date,
    O_delivered_date  : Date,
    O_cost            : String,
    O_status          : Boolean   
});
module.exports=mongoose.model('Order_Master',Order_master);