const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const topicSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        index: true
    },
    forumCategory: {
        type: Schema.Types.ObjectId, ref: 'forumCategories'
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('topic', topicSchema);