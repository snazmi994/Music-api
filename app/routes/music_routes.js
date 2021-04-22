const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Music = require('../models/music')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// CREATE
// POST
router.post('/music', requireToken, (req, res, next) => {
  const musicData = req.body.music
  musicData.owner = req.user.id
  Music.create(musicData)
    .then(handle404)
    .then(music => res.status(201).json({ music }))
    .catch(next)
})

// PATCH THE RIGHT WAY?
router.patch('/music/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.music.owner
  const musicData = req.body.music
  Music.findById(req.params.id)
    .then(handle404)
    .then(music => {
      requireOwnership(req, music)
      return music.updateOne(musicData)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
// INDEX
// GET /examples
router.get('/music', requireToken, (req, res, next) => {
  const musicData = req.body.music

  Music.find()
    .then(music => {
      return music.map(music => music.toObject())
    })
    .then(music => res.status(200).json(musicData))
    .catch(next)
})

// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/music/:id', requireToken, (req, res, next) => {
  const musicData = req.body.music
  Music.findById(req.params.id)
    .then(handle404)
    .then(music => {
      requireOwnership(req, music)
      music.deleteOne(musicData)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
// PATCH /users/:id
// router.patch('/music/:id', requireToken, (req, res, next) => {
//   const musicData = req.body.music
//   const user = req.user
//   Music.findById(req.params.id)
//     .then(handle404)
//     .then(music => music.updateOne(musicData))
//     .then(() => res.sendStatus(204))
//     .catch(next)
// })

// // INDEX
// // GET /examples
// router.get('/music', requireToken, (req, res, next) => {
//   const user = req.user
//   Music.find({owner: user._id})
//     .then(handle404)
//     .then(music => res.json({ music: music }))
//     .catch(next)
// })

// //show
// // GET /users/:id
// router.get('/music/:id', requireToken, (req, res, next) => {
//   const musicData = req.body.music
//   const user = req.user
//   Music.findById(req.params._id)
//     .then(handle404)
//     .then(music => res.json(musicData))
//     .catch(next)
// })

// //delete
//
// router.delete('/music/:id', requireToken, (req, res, next) => {
//   const musicData = req.body.music
//   const user = req.user
//   Music.findById(req.params.id)
//     .then(handle404)
//     .then(music => music.deleteOne(musicData))
//     .then(() => res.sendStatus(204))
//     .catch(next)
// })

// module.exports = router
