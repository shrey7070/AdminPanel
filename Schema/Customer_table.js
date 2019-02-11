var mongoose= require('mongoose');
var schema=mongoose.Schema;
var customer_data  = new schema({

    Customer_id              :     String,
    Customer_name            :     String,
    Customer_contact_no      :     Number,
    Customer_email           :     String,
    Customer_address         :     String,
    Customer_dob             :     Date,
    Customer_gender          :     String, 
    Customer_password        :     String,
});
module.exports=mongoose.model('Customer',customer_data);