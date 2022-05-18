const User = require('../models/user')
const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (req, res)=>{
   const body = req.body
   const user = await User.findOne({username: body.username })
   const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)
   if(!(user && passwordCorrect)){
      return res.status(401).json({
         error: 'invalid autenficatioon'
      }) 
   }
   const userForToken = {
      username: user.username,
      id: user._id,
   }
   const token = jwt.sign(userForToken, 'SECRET')
   return res.status(200).json({token, username: user.username, name: user.name})
})

module.exports = loginRouter

