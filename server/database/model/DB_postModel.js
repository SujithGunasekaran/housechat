const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        index: true
    },
    fullSlug: {
        type: String,
        unique: true,
        index: true
    },
    topic: {
        type: Schema.Types.ObjectId,
        ref: 'topic'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'post'
    },
    createdAt: {
        type: Date, default: Date.now
    }
})

module.exports = mongoose.model('post', postSchema);