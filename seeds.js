var mongoose=require("mongoose");
var campground=require("./modules/campgrounds");
var comment=require("./modules/comments")
var data=[
    {title:"Desert mela",image:"https://farm3.staticflickr.com/2630/4089140779_fc5cd0c694.jpg",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad quod culpa voluptatibus expedita, consectetur, deleniti eum saepe asperiores eius eaque minus! Rerum, odio ullam delectus magni. Corrupti, unde. Consequuntur, ipsum?"},
    {title:"Car mela",image:"https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad quod culpa voluptatibus expedita, consectetur, deleniti eum saepe asperiores eius eaque minus! Rerum, odio ullam delectus magni. Corrupti, unde. Consequuntur, ipsum?"},
    {title:"Lot mela",image:"https://farm1.staticflickr.com/104/274197688_974a87740e.jpg",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad quod culpa voluptatibus expedita, consectetur, deleniti eum saepe asperiores eius eaque minus! Rerum, odio ullam delectus magni. Corrupti, unde. Consequuntur, ipsum?"}
    
    ]
function seedDB(){
    campground.remove({},function(err){
    if(err)
    console.log(err);
    else
    {
            console.log("delete successful");
            data.forEach(function(seed){
                campground.create(seed,function(err,seed){
                     console.log("seed added");
                     comment.create(
                    {text:"This a boring bad place dont come here",
                    author:"sennu"
                    },function(err,comment){
                     seed.comments.push(comment);
                     seed.save();
                     console.log("comment added");
                }) 
                })
            })
            
    
    }
    })    
    
    
   
}
module.exports=seedDB;
