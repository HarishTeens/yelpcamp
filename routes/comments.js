var express = require("express");
var middleware = require("../middleware");
var router = express.Router({ mergeParams: true });
var campground = require("../modules/campgrounds");
var comment = require("../modules/comments");
//==============
//COMMENT ROUTES
//==============

//CREATE
router.get("/new", middleware.isLoggedIn, function(req, res) {
    campground.findById(req.params.id, function(err, found) {
        if (err)
            console.log(err);
        else {
            res.render("comments/new", { campground: found });
        }
    })
})

//NEW
router.post("/", middleware.isLoggedIn, function(req, res) {
    campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    req.flash("error", "Something went wrong!")
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundCampground.comments.push(comment);
                    foundCampground.save(function(err) {
                        console.log("callback");
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                    });
                    req.flash("success", "Successfully added your comment")
                    res.redirect("/campgrounds/" + req.params.id);
                }

            })
        }
    })
})

//EDIT
router.get("/:comment_id/edit", middleware.isCommentAuthorised, function(req, res) {
    comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err)
            console.log(err);
        else {

            res.render("comments/edit", { comment: foundComment, campground_id: req.params.id });
        }

    })
})

//UPDATE
router.put("/:comment_id", middleware.isCommentAuthorised, function(req, res) {
    comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment) {
        if (err)
            console.log(err)
        else
            res.redirect("/campgrounds/" + req.params.id);
    })
})

//DESTROY
router.delete("/:comment_id", middleware.isCommentAuthorised, function(req, res) {
    comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err)
            console.log(err);
        else {
            req.flash("success", "Comment Deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }

    })
})



module.exports = router;