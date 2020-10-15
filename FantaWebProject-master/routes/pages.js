const express = require('express');
const router = express.Router();
const User = require('../core/user');
const Forgot = require('../core/forgot_password');
const crypto = require("crypto");
//const Product = require('../core/product');
const user = new User();
const forgot = new Forgot();
//const prod = new Product();
const placeOrder = require('../core/checkout');
const placeOrders = new placeOrder();


router.get('/home', (req, res) => {
    let user = req.session.user;

    /*if(user){
        res.render('home', {opp:req.session.opp, name:user.email})
    }*/
    res.redirect('/');
})


//get home page
router.get('/', (req, res) => {
    res.render('Home/Home_Page.ejs')
})

// Get home page
router.get('/home', (req, res, next) => {
    let user = req.session.user;

    if (user) {
        res.render('Home/Home_Page.ejs', { opp: req.session.opp, email: user.email });
        return;
    }
    res.redirect('/');
});

//get login page
router.get('/login', (req, res) => {
    res.render('Login/page-login.ejs');
})

//get product page
router.get('/product_info', (req, res) => {
    res.render('Product/Product_Page.ejs')
})

//get about page
router.get('/about', (req, res) => {
    res.render('About/About_Page.ejs')
})

//get checkout page
router.get('/checkout', (req, res) => {
    res.render('Checkout/Checkout_page.ejs')
})

//get thanks page
router.get('/thanks', (req, res) => {
    res.render('Thanks/Thanks.ejs')
})

//get Forgot_Password page
router.get('/forgot_Password', (req, res) => {
    res.render('Forgot_Password/page-forgot.ejs')
})

//get lists of products page
router.get('/products', (req, res) => {
    //prod.getNom(20001)
    res.render('List_Products/List_Products_Page.ejs')
})

//get reset password page
router.get('/account', (req, res) => {
    res.render('User Profile/User Profile.ejs')
})

//get list of orders page for ADMIN
router.get('/admin_order_list', (req, res) => {
    res.render('Admin/admin-order-list.ejs')
})

//reset password
router.get('/reset/:token', function (req, res) {
    let dateToken = new Date(Date.now());
    user.findToken({ resetPasswordToken: req.params.token, resetPasswordExpire: dateToken }, function (user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/forgot_Password');
        }
        res.render('Reset_Password/page-reset.ejs', { token: req.params.token });
    });
});

//post checkout info to database
router.post('/checkout', (req, res, next) => {
    let infoCheckout = {
        infoShipping: req.body.adr + ', ' + req.body.city + ', ' + req.body.province + ', ' + req.body.zip,
        infoClient: req.body.fullName + ', ' + req.body.phone + ', ' + req.body.email,
        nbBoisson: req.body.amount,
        prixFinal: req.body.finalPrice,
        etat: 'En cours'
    };

    placeOrders.create(infoCheckout, function (lastId) {
        if (lastId) {
            console.log("New order created");

            for (var i = 0; i < req.body.amount; i++) {
                let infoBoisson = {
                    boissonId: req.body.idBoisson[i],
                    commandeId: lastId
                };
                placeOrders.boisson(infoBoisson, function (lastId) {
                    if (lastId) {
                        console.log("Drinks row added");
                    } else {
                        console.log("Error adding to drinks table");
                        res.redirect('/checkout');
                    }
                });
            }
            res.redirect('/thanks');
        }
    });
})

//post register data
router.post('/signup', (req, res, next) => {
    if (req.body.passwordConfirm == req.body.passwordRegister) {
        let clientInput = {
            nom: req.body.lastName,
            prenom: req.body.firstName
        };
        user.client(clientInput, function (lastId) {
            if (lastId) {
                let userInput = {
                    email: req.body.emailRegister,
                    password: req.body.passwordRegister,
                    clientId: lastId
                };

                user.create(userInput, function (lastId) {
                    if (lastId) {
                        user.find(lastId, function (result) {
                            req.session.user = result;
                            req.session.opp = 1;
                            console.log("New user created");
                            res.redirect('/home');
                        });
                    } else {
                        req.flash('error_msg', "Error creating a new user...");
                        res.redirect('/login');
                    }
                });

            } else {
                req.flash('error_msg', "Error creating a new user...");
                res.redirect('/login');
            }
        });

    }
    else {
        req.flash('error_msg', "The password are not matching");
        res.redirect('/login');
    }

})

//post login data
router.post('/login', (req, res, next) => {
    user.login(req.body.emailLogin, req.body.passwordLogin, function (result) {
        if (result) {
            // Store the user data in a session.
            req.session.user = result;
            req.session.opp = 1;
            // redirect the user to the home page.
            console.log('connected');
            res.redirect('/home');
        } else {
            // if the login function returns null send this error message back to the user.
            req.flash('error_msg', "Username / Password doesn't exist");
            res.redirect('/login');
        }
    })
})

// Get loggout page
router.get('/logout', (req, res, next) => {
    // Check if the session is exist
    if (req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function () {
            res.redirect('/home');
        });
    }
})

//post forgot password
router.post('/forgot_Password', (req, res, next) => {

    var email = req.body.emailForgot;
    var token = "";
    crypto.randomBytes(20, (err, buf) => {
        token = buf.toString('hex');
    });

    var datePassword = Date.now() + 3600000;

    forgot.find(email, function (result) {
        if (result) {
            let emailInfo = {
                email: result.Email,
                fromAddress: "gui.dlb.37@gmail.com",
                subject: "Your forgotten password",
                message: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://localhost:3000/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n',
                token: token,
                dateToken: datePassword
            };

            forgot.send(emailInfo, function (result) {
                if (result) {
                    req.flash('success_msg', 'An e-mail has been sent to ' + email + ' with further instructions.')
                    res.redirect('/forgot_Password');
                }
            })
        } else {
            req.flash('error_msg', "Email doesn't exist!");
            res.redirect('/forgot_Password');
        }
    })
})

//post reset password
router.post('/reset/:token', (req, res, next) => {
    let dateToken = new Date(Date.now());
    user.findToken({ resetPasswordToken: req.params.token, resetPasswordExpire: dateToken }, function (user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            res.redirect('/login');
        }
        if (req.body.passwordReset == req.body.passwordResetConfirm) {
            let userInfo = {
                email: user.Email,
                password: req.body.passwordReset
            }
            forgot.update(userInfo, function (result) {
                if (result) {
                    req.flash('success_msg', 'Success! Your password has been changed.');
                    res.redirect('/login');
                } else {
                    req.flash("error_msg", "Error changing password");
                    res.render('Reset_Password/page-reset.ejs', { token: req.params.token });
                }
            })
        } else {
            req.flash("error_msg", "Passwords do not match.");
            res.render('Reset_Password/page-reset.ejs', { token: req.params.token });
        }
    });
})

module.exports = router;