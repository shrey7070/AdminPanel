var mongoose= require('mongoose');
var schema=mongoose.Schema;
var category  = new schema({
    cate_id     : String,
    cate_name   : String  
});
module.exports=mongoose.model('Category',category);
