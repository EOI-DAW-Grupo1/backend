// const mongoose = require('mongoose')
// const slugify = require('slugify')

// const ArticleSchema = mongoose.Schema({
//   title: { type: String, required: true, minlength: 3, maxlength: 255 },
//   slug: { type: String, required: true, minlength: 3, maxlength: 255, unique: true },
//   excerpt: {type: String, required: true, maxlength: 150},
//   published_at: {type: Date, default: Date.now},
//   category: { type: String, required: true, enum: ['Technology', 'General', 'Politics', 'Sports'] },
//   comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }]
// })

// const Article = mongoose.model('article', ArticleSchema)

// module.exports = Article
