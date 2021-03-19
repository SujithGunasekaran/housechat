
const uniqueSlug = require('unique-slug');
const moment = require('moment');

class Post {

    constructor(model, user) {
        this.Model = model;
        this.user = user;
    }

    getAllByTopic(topic) {
        return this.Model.find({ topic }).populate('user').populate('topic').populate({ path: 'parent', populate: 'user' });
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