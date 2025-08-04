const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: { createdAt: 'timestamp' } // Use 'timestamp' to match frontend expectation
});

module.exports = mongoose.model('Post', PostSchema);