'use strict'

const express = require('express');
const { sha512 } = require('js-sha512');
const router = express.Router()


const userModel = require('../models/UserModel')

router.route('/newUser')
  .post(async (req, res) => {
    let userData = req.body
    try {

      userData.profile = "user"
      userData.password = sha512(userData.password)

      userData = await new userModel(userData).save()
      userData = userData.toJSON()
      delete userData.password

      res.status(201).json(userData)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  })


module.exports = router
