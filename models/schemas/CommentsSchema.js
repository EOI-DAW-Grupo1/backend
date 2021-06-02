
const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
  message: { type: String, required: true },
});



module.exports = commentSchema
