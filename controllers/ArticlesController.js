
'use strict'

const express = require('express')
const router = express.Router()
const { Mongoose } = require("mongoose")
const slugify = require('slugify')
const Article = require('../models/ArticleModel')
const Comment = require('../models/CommentsModel')
const authMiddleware = require('../modules/authenticator')
const publicAccess = authMiddleware(true, ['user', 'admin'])
const onlyAdminAccess = authMiddleware(true, ['admin'])

require("../modules/database")

router.route('/articles')
  .get(publicAccess, async (req, res) => {
    try {


      // if (!req.tokenData || req.tokenData.profile === 'user') {
      //   filterParams.enabled = true
      // }

      const articleList = await Article.find().exec()

      res.json(articleList)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })
  .post(publicAccess, async (req, res) => {
    try {
      let newArticle = req.body

      if (!newArticle.hasOwnProperty("slug") ||
        (newArticle.hasOwnProperty("slug") && newArticle.slug === '')) {
        newArticle.slug = newArticle.title
      }

      newArticle.slug = slugify(newArticle.slug, { lower: true, strict: true })

      newArticle = await new Article(newArticle).save()


      res.status(201).json(newArticle)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })



router.route('/articles/:id/comments')
.post(publicAccess, async(req,res) => {

  const id = req.params.id
    const {text} = req.body

    const comment = new Comment()
    comment.message = text
    await comment.save()

    const article = await Article.findById(id)
    article.comments.push({_id: comment._id})
    article.save().then(() => res.redirect('/'))
    return res.json(article)
})

router.route('/articles/:id')
.get(publicAccess, async(req,res) => {

    const id = req.params.id

    const article = await Article.findById(id).populate("comments").exec()

    return res.json(article)
})
  .delete(onlyAdminAccess, async (req, res) => {
    try {
      const articleId = req.params.articleId

      const result = await Article.findOneAndDelete({ _id: articleId }).exec()

      if (!result) {
        res.status(404).json({ message: `Artículo con identificador ${articleId} no encontrado.` })
        return
      }

      res.status(204).json(null)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })

module.exports = router
