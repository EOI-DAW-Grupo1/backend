'use strict'

const express = require('express');
const { sha512 } = require('js-sha512');
const router = express.Router()
<<<<<<< HEAD
const config = require('../modules/config')
// const mailer = require('../modules/mailer')
const authMiddleware = require('../modules/authenticator')
const onlyRegisteredAccess = authMiddleware(true, ['user', 'admin'])
const onlyAdminAccess = authMiddleware(true, ['admin'])
=======
>>>>>>> origin/master


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
<<<<<<< HEAD

    // try {
    //   //envío email de bienvenida en segundo plano
    //   userData.public_domain = config.PUBLIC_DOMAIN
    //   res.render(config.WELLCOME_EMAIL_TPL, userData, async (err, emailBody) => {
    //     if (err) {
    //       //si se produce algún error de renderización del template se cancela el envío
    //       return
    //     }

    //     const from = { name: userData.firstname, email: userData.email }

    //     //envía correo electrónico
    //     await mailer.send(from, userData.email, config.WELLCOME_SUBJECT, emailBody, true)
    //   })
    // } catch (error) {
    //   console.info("Envío de correo electrónico al usuario erróneo.")
    //   console.error(error)
    // }
=======
>>>>>>> origin/master
  })


module.exports = router
