'use strict'

const mongoose = require('mongoose')

const commentSchema = require('./schemas/CommentsSchema')

const Comment = mongoose.model("comment", commentSchema)

module.exports = Comment
