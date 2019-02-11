var mongoose=require('mongoose');
var schema1=mongoose.Schema;
var subcategory  = new schema1({
    subcate_id      : String,
    subcate_name    : String,
    _category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }  
});
module.exports=mongoose.model('Subcategory',subcategory);