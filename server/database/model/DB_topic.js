const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const topicSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    slug: {
        type: String
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