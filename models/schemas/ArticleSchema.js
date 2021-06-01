const { Schema } = require("mongoose")
const slugify = require('slugify')

const ArticleSchema = new Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 255 },
  slug: { type: String, required: true, minlength: 3, maxlength: 255, unique: true },
  excerpt: {type: String, required: true, maxlength: 150},
  content: { type: String, required: true, minlength: 3 },
  published_at: {type: Date, default: Date.now},
  category: { type: String, required: true, enum: ['Restauración', 'General', 'Foodies', 'Promociones y descuentos'] },
  enabled: { type: Boolean, default: false }
})

module.exports = ArticleSchema
