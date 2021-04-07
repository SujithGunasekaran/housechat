const slugify = require('slugify');
const uniqueSlug = require('unique-slug');
const BaseModel = require('./Gql_BaseMode');
class ForumTopics extends BaseModel {

    async getRandom(limit) {
        const query = await super.getRandom(limit);
        return query().populate('user').populate('forumCategory');
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

        const data = ['content', 'title'];
        let emptyDataErrorMessage = '';

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
            data.map((fieldName, index) => {
                if (err.message.includes(fieldName)) {
                    emptyDataErrorMessage += `${index > 0 ? ', ' : ''}${fieldName}`;
                }
            })
            if (emptyDataErrorMessage) throw new Error(`Please Enter ${emptyDataErrorMessage}`);
            return null;
        }
    }
}

module.exports = ForumTopics;