const mongoose = require('mongoose')

const activitySchema = mongoose.Schema({
  bookInfo: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Books'
    },
    name: {
      type: String
    },
    time: {
      issueDate: Date,
      returnDate: Date
    }
  },
  userInfo: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    },
    fullname: String,
    phone: Number,
    email: String
  },

  category: {
    type: String,
    enum: ['Issued', 'Returned'],
    default: 'Issued'
  }
})

module.exports = mongoose.model('Activity', activitySchema)
