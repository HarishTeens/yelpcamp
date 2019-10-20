var express=require("express");
var moment = require('moment');
var middleware=require("../middleware");
var router=express.Router();
var campground=require("../modules/campgrounds");

//INDEX
router.get("/",function(req,res){
    campground.find({},function(err,allcampgrounds){
        if(err)
        console.log(err);
        else
        {
            req.session.regenerate(function(err) {
  // will have a new session here
})
      res.render("campgrounds/index",{campgrounds:allcampgrounds});
        }
  
    })
})

//create
router.post("/",middleware.isLoggedIn,function(req,res){
    var newcampground={title:req.body.name, 
                       price:req.body.price,
                       image:req.body.image,
                       description:req.body.description,
                       author:{username:req.user.username,id:req.user._id}};
    campground.create(newcampground,function(err,newcreated){
        if(err)
        console.log(err);
        else{
            req.flash("success","Campground Added succesfully");
            res.redirect("/campgrounds");
        }
    })
    
})

//new
router.get("/new",middleware.isLoggedIn,function(req, res) {
    res.render("campgrounds/new");
})
//SHOW
router.get("/:id",function(req, res) {
    campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err)
        console.log(err);
        else
        res.render("campgrounds/show",{campground:foundCampground, moment});
    })
    
})


//Edit
router.get("/:id/edit",middleware.isCampgroundAuthorised,function(req,res){
    campground.findById(req.params.id,function(err, foundCampground) {
        if(err)
        console.log(err);
        else
        res.render("campgrounds/edit",{campground:foundCampground});        
    })
})

//Update
router.put("/:id",middleware.isCampgroundAuthorised,function(req,res){
   campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updated){
       if(err)
       console.log(err);
       else
       {
           req.flash("success","Campground Updated succesfully");
           res.redirect("/campgrounds/"+req.params.id);
       }
       
   })
})

//Destroy
router.delete("/:id",middleware.isCampgroundAuthorised,function(req,res){
    campground.findByIdAndRemove(req.params.id,function(err){
        if(err)
        console.log(err);
        else
        {
            req.flash("success","Campground Deleted succesfully");
            res.redirect("/campgrounds");
        }
        
    })
})




module.exports=router;