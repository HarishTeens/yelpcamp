var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
    title: String,
    price: String,
    image: String,
    description: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
    }],
    author: {
        username: String,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
}, {
    usePushEach: true
});
module.exports = mongoose.model("campground", campgroundSchema);