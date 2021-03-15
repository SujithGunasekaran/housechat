
class ForumTopics {

    constructor(model) {
        this.Model = model;
    }

    getAllTopicsByCategory(categoryID) {
        return this.Model.find({ forumCategory: categoryID }).populate('user').populate('forumCategory');
    }
}

module.exports = ForumTopics;