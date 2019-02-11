var mongoose= require('mongoose');
var schema=mongoose.Schema;
var feedback  = new schema({
    feedback_id   : String,
    feedback_date   :Date,
    customer_id  : String
});
module.exports=mongoose.model('Feedback',feedback);