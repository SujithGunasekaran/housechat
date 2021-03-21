const slugify = require('slugify');
const uniqueSlug = require('unique-slug');
class ForumTopics {

    constructor(model, user) {
        this.Model = model;
        this.user = user;
    }

    async getRandom(limit) {
        const count = await this.Model.countDocuments();
        let randomIndex;
        if (limit > count) {
            randomIndex = 0;
        }
        else {
            randomIndex = count - limit;
        }
        let randomNumber = Math.round(Math.random() * randomIndex);
        return this.Model.find({}).populate('user').populate('forumCategory').skip(randomNumber).limit(limit);
    }

    getAllTopicsByCategory(categoryID) {
        return this.Model.find({ forumCategory: categoryID }).populate('user').populate('forumCategory');
    }

    getTopicBySlug(slugName) {
        return this.Model.findOne({ slug: slugName }).populate('user').populate('forumCategory');
    }

    async _create(data) {
        const createdTopic = await this.Model.create(data);
        return this.Model.findById(createdTopic._id).populate('user').populate('forumCategory');
    }

    async create(topicData) {
        if (!this.user) {
            throw new Error('You need to authenticate to create topic!')
        }

        topicData.user = this.user;

        // generate slug
        topicData.slug = slugify(topicData.title, {
            replacement: '-',
            remove: undefined,
            lower: true,
            strict: false,
        });

        try {
            const topic = await this._create(topicData);
            return topic;
        }
        catch (err) {
            if (err.code === 11000 && err.keyPattern && err.keyPattern.slug) {
                topicData.slug += `-${uniqueSlug()}`;
                const topic = await this._create(topicData);
                return topic;
            }
            return null;
        }
    }
}

module.exports = ForumTopics;