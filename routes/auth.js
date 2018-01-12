var express=require("express");
var router=express.Router();
var User=require("../modules/user");
var passport=require("passport");
//ROUTES

//ROOT
router.get("/",function (req,res) {
    res.render("landing");
})

//==============
//AUTH ROUTES
//==============

//registration form
router.get("/register",function(req, res) {
    res.render("register");
})

//sign up
router.post("/register",function(req, res) {
    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err)
        {
            req.flash("error",err.message);
            return res.redirect("/register");
        }
        else
        {
            passport.authenticate("local")(req,res,function(){
                req.flash("success","Welcome to YelpCamp "+user.username);
                res.redirect("/campgrounds");
            })
        }
    })
})

//login form
router.get("/login",function(req, res) {
    req.session.regenerate(function(err) {
  // will have a new session here
})
    res.render("login");
})
//login
router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login",
    successFlash:"Successfully Logged in",
    failureFlash:"Incorrect username or password"
    }),function(req, res) {
        res.cookie('name','fuck');
})

//logout
router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success","Logged you out");
    res.redirect("/campgrounds");
})


module.exports=router;