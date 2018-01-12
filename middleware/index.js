//all middlewares goes here
var campground=require("../modules/campgrounds");
var comment=require("../modules/comments");
var middlewareObj={};
middlewareObj.isCampgroundAuthorised=function(req,res,next){
    if(req.isAuthenticated())
    {
            campground.findById(req.params.id,function(err,foundCampground){
            if(err)
            {
                req.flash("error","Campground Not Found");  
                res.redirect("back");
            }
            else
            {
                if(foundCampground.author.id.equals(req.user._id))
                {
                    next();
                }
                else
                {
                    req.flash("error","Access Denied!")
                    res.redirect("back");
                }
            }
            
    })
    }
    else
    {
        req.flash("error","You must be logged in to do that!");
        res.redirect("/login");res.redirect("/login");
    }
    
}


middlewareObj.isCommentAuthorised=function(req,res,next){
    if(req.isAuthenticated())
    {
            comment.findById(req.params.comment_id,function(err,foundComment){
            if(err)
            console.log(err);
            else
            {
                console.log(foundComment.author.id);
                if(foundComment.author.id.equals(req.user._id))
                {
                    next();
                }
                else
                {
                    req.flash("error","Access Denied!")
                    res.redirect("back");
                }
            }
            
    })
    }
    else
    {
        req.flash("error","You must be logged in to do that!")
        res.redirect("/login");
    }
    

}

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated())
    {
        console.log(req.session);
        next();
       
    }
    
    else
    {
        req.flash("error","You must be logged in to do that!");
        res.redirect("/login");
    }
    

}
module.exports=middlewareObj;