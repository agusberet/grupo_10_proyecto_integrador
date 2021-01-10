var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session') 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter= require('./routes/products');
var cartsRouter = require('./routes/carts');
var apiProductsRouter = require('./routes/api/products');
var apiCartsRouter = require('./routes/api/carts');
var apiUsersRouter = require('./routes/api/users');
var rememberMiddleware = require('./middlewares/rememberMiddleware');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'Secreto', resave: false, saveUninitialized: false}));
app.use(rememberMiddleware);



app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/carts', cartsRouter);
app.use('/api/products', apiProductsRouter);
app.use('/api/carts', apiCartsRouter);
app.use('/api/users', apiUsersRouter);

/*catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});*/
app.use((req, res, next)=>{ // cuando el  estatus sea 404 renderiza a la vista not found
  res.status(404).render("not-found")
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
