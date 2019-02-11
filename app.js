var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session=  require('express-session');
var fileupload=  require('express-fileupload');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/Admin');
var customerRouter  = require('./routes/Customer');
var categoryRouter  = require('./routes/Category');
var subcategoryRouter  = require('./routes/subcategory');
var productRouter  = require('./routes/Product');
var inqueryRouter  = require('./routes/Inquery');

var app = express();

// view engine setup
app.set('views', [path.join(__dirname, 'views'),
        path.join(__dirname,'/views/Admin'),
        path.join(__dirname,'/views/Customer'),
        path.join(__dirname,'/views/Category'),
        path.join(__dirname,'/views/SubCategory'),
        path.join(__dirname,'/views/Product'),
      path.join(__dirname,'/views/Inquery')]);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret:'keyboard cat', resave:false,saveUninitialized:true}));
app.use(fileupload())
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/customer', customerRouter);
app.use('/category',categoryRouter);
app.use('/subcategory',subcategoryRouter);
app.use('/product',productRouter);
app.use('/inquery',inqueryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//dbconnection
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/rentpeDB',{useNewUrlParser:true},function(err){
if(err)
console.log("Error");
else
console.log("Connection Sucessfull");
})

module.exports = app;