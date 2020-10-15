const express = require('express');
const session = require('express-session');
const app = express();
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const pageRouter = require('./routes/pages');



//parse all form data
app.use(bodyParser.urlencoded({ extended: true }));

//template engine

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//import the product module
var product = require('./core/product');
app.use('/product', product);

//import the admin list order module
var adminListOrder = require('./core/admin_list_order');
app.use('/admin_list_order', adminListOrder);

//cookieParser
app.use(cookieParser('secret'));

//session
app.use(session({
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));

app.use(flash());

// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.opp = req.session.opp;
    next();
});

//router
app.use('/', pageRouter);
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var err = new Error('404 Error - Page not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

app.listen('3000', () => {
    console.log('Server started on port 3000')
});



