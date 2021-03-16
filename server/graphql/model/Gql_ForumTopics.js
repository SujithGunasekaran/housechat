
class ForumTopics {

    constructor(model, user) {
        this.Model = model;
        this.user = user;
    }

    getAllTopicsByCategory(categoryID) {
        return this.Model.find({ forumCategory: categoryID }).populate('user').populate('forumCategory');
    }

    async create(topicData) {
        if (!this.user) {
            throw new Error('You need to authenticate to create topic!')
        }

        topicData.user = this.user;

        // generate slug
        topicData.slug = "Random";

        const createdTopic = await this.Model.create(topicData);
        return this.Model.findById(createdTopic._id).populate('user').populate('forumCategory');
    }
}

module.exports = ForumTopics;