const mongoose = require('mongoose')
const commentSchema = require('./comment')

const musicSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    unique: true
  },
  artist: {
    type: String,
    required: true,
    unique: true
  },
  fav_song: {
    type: String,
    required: true,
    unique: true
  },
  comments: [commentSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
{
  timestamps: true,
  toObject: {
    // remove `hashedPassword` field when we call `.toObject`
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    }
  }
})

module.exports = mongoose.model('Music', musicSchema)
