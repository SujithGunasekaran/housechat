
const uniqueSlug = require('unique-slug');
const moment = require('moment');

class Post {

    constructor(model, user) {
        this.Model = model;
        this.user = user;
    }

    async getAllByTopic(topic, pageNumber, pageSize) {
        const skipItem = pageSize * (pageNumber - 1);
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

    async create(post) {

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

        const createdPost = await this.Model.create(post);
        return this.Model.findById(createdPost).populate('topic').populate('user').populate({ path: 'parent', populate: 'user' })

    }

}

module.exports = Post;