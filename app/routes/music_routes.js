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

// PATCH
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
  Music.find({owner: req.user.id}) // find only music for that user
    .then(musics => {
      return musics.map(music => music.toObject())
    })
    .then(musics => res.status(200).json(musics)) // musics
    .catch(next)
})

// show
router.get('/music/:id', requireToken, (req, res, next) => {
  const musicData = req.body.music
  Music.findById(req.params.id)
    .then(handle404)
    .then(music => res.status(200).json(musicData))
    .catch(next)
})
// DESTROY
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
