const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const forumCategoriesSchema = new Schema({
    title: {
        type: String
    },
    subTitle: {
        type: String
    },
    slug: {
        type: String,
        unique: true,
        index: true
    },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('forumCategories', forumCategoriesSchema);