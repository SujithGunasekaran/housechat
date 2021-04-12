
const uniqueSlug = require('unique-slug');
const moment = require('moment');
const BaseModel = require('./Gql_BaseMode');
class Post extends BaseModel {


    async getAllByTopic(topic, skipLength, pageSize) {
        const skipItem = skipLength;
        const count = await this.Model.countDocuments({ topic });
        const posts = await this.Model
            .find({ topic })
            .skip(skipItem) // It will skip the item from db ( eg. if we give like this skip(5) it will skip first five item from db )
            .limit(pageSize) // Limit the result size
            .populate('user')
            .populate('topic')
            .populate({ path: 'parent', populate: 'user' });
        return { posts, count };
    }

    async _createPost(post) {
        return await this.Model.create(post);
    }

    async create(post) {

        const data = ['content'];
        let emptyDataErrorMessage = '';

        if (!this.user) {
            throw new Error('You must be signed in to create post!');
        }

        post.user = this.user;

        const createdAt = moment().toISOString();
        const slugPart = uniqueSlug();
        const fullSlugPart = `${createdAt}:${slugPart}`;

        if (post.parent) {
            const parent = await this.Model.findById(post.parent);
            post.slug = `${parent.slug}/${slugPart}`;
            post.fullSlug = `${parent.fullSlug}/${fullSlugPart}`;
        }
        else {
            post.slug = slugPart;
            post.fullSlug = fullSlugPart;
        }

        try {
            const createPost = await this._createPost(post);
            return this.Model.findById(createPost).populate('topic').populate('user').populate({ path: 'parent', populate: 'user' })
        }
        catch (err) {
            data.map((fieldName, index) => {
                if (err.message.includes(fieldName)) {
                    emptyDataErrorMessage += `${index > 0 ? ', ' : ''}${fieldName}`;
                }
            })
            if (emptyDataErrorMessage) throw new Error(`Please Enter ${emptyDataErrorMessage}`);
            return 'Something went wrong';
        }
        // const createdPost = await this.Model.create(post);
        // return this.Model.findById(createdPost).populate('topic').populate('user').populate({ path: 'parent', populate: 'user' })

    }

}

module.exports = Post;