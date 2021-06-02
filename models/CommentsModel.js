const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
  message: {type: String}
});

const Comment = mongoose.model("comment", commentSchema)

module.exports = Comment
