const express = require('express')

// pull in error types and the logic to handle them and set status codes
const handle404 = require('../../lib/custom_errors')

const Music = require('../models/music')
// const User = require('../models/user')

const passport = require('passport')

const requireToken = passport.authenticate('bearer', {session: false})

const router = express.Router()

// CREATE
// POST
router.post('/music', requireToken, (req, res, next) => {
  const musicData = req.body.music
  musicData.owner = req.user.id
  Music.create(musicData)
    .then(handle404)
    .then(event => res.status(201).json({ event }))
    .catch(next)
})

// PATCH /users/:id
router.patch('/music/:id', requireToken, (req, res, next) => {
  const musicData = req.body.music
  Music.findById(req.params.id)
    .then(handle404)
    .then(music => music.updateOne(musicData))
    .then(() => res.sendStatus(204))
    .catch(next)
})

// router.get('/music', requireToken, (req, res, next) => {
//   const user = req.user
//   Music.find({owner: user._id})
//     .then(handle404)
//     .then(events => res.json({music:music}))
//     .catch(next)
// })
// SHOW
// GET /users/:id
// router.get('/music/:id', requireToken, (req, res, next) => {
//   const id = req.params.id
//   const musicData = req.body.music
//   Music.findById(id)
//     .then(handle404)
//     .then(music => res.json({music: music}))
//     .catch(next)
// })
// router.delete('/music/:id', requireToken, (req, res, next) => {
//   const user = req.user
//   Music.findById({owner: user._id})
//     .then(handle404)
//     .then(music => music.deleteOne())
//     .then(() => res.sendStatus(204))
//     .catch(next)
// })

module.exports = router
