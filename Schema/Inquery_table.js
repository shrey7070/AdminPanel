var mongoose= require('mongoose');
var schema=mongoose.Schema;
var Inquery_data  = new schema({
    inq_id          : String,
    customer_id     : String,
    inq_date        : Date,
    inq_question : String,
    inq_answer : String
});
module.exports=mongoose.model('Inquery',Inquery_data);