var express = require("express")(),
    mongoose = require("mongoose"),
    bodyparser = require("body-parser"),
    campground = require("./modules/campgrounds"),
    comment = require("./modules/comments"),
    passport = require("passport"),
    User = require("./modules/user"),
    localstrategy = require("passport-local"),
    passportlocalmongoose = require("passport-local-mongoose"),
    methodOverride = require("method-override"),
    flash = require("connect-flash"),
    cp = require("cookie-parser")
seedDB = require("./seeds");

var commentRoutes = require("./routes/comments"),
    authRoutes = require("./routes/auth"),
    campgroundRoutes = require("./routes/campgrounds");

//seedDB();
express.use(cp());
express.set("view engine", "ejs");
express.use(bodyparser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://harish:harish16@ds131697.mlab.com:31697/yelpcamp", { useMongoClient: true })
    //mongoose.connect("mongodb://localhost/yelpcamp", { useMongoClient: true });
express.use(require("express").static("public"));
express.use(methodOverride("_method"));
express.use(flash());

//PASSPORT CONFIGURATIONS
express.use(require("express-session")({
    secret: "All You want to do is stay a minute ",
    resave: false,
    saveUninitialized: false,
}));
express.use(passport.initialize());
express.use(passport.session());
passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

express.use(function(req, res, next) {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
})

//requiring routes
express.use("/campgrounds/:id/comments", commentRoutes);
express.use(authRoutes);
express.use("/campgrounds", campgroundRoutes);

express.listen(3000, function() {
    console.log("Started YelpCamp server....");
})