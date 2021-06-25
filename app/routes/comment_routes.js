const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Music = require('../models/music')
const Comment = require('../models/comment')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

router.post('/comments', requireToken, (req, res, next) => {
  const comment = req.body.comment // get comment
  const musicId = req.body.musicId // get music ID
  comment.owner = req.user.id
  Music.findById(musicId) // find music
    .then(handle404)
    .then(music => {
      music.comments.push(comment) // add comment to music
      return music.save()
    })
    .then(music => {
      res.status(201).json({ music })
    })
    .catch(next)
})

// bye bye

router.delete('/comments/:commentId/', requireToken, (req, res, next) => {
  const commentId = req.params.commentId
  const musicId = req.body.musicId
  console.log(commentId)
  console.log(musicId)
  Music.findById(musicId)
    .then(handle404)
    .then(comment => {
      // music.comments.id(commentId).delete()
      comment.remove()
      // return music.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
module.exports = router
