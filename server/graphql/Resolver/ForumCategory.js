
exports.forumCategoryQueries = {
    forumCategories: (root, args, context) => {
        return context.models.ForumCategory.getAll();
    },
    topicsByCategory: async (root, { categoryName }, context) => {
        let forumCategory = await context.models.ForumCategory.getCategoryBySlug(categoryName);
        if (!forumCategory) return null;
        return context.models.ForumTopics.getAllTopicsByCategory(forumCategory._id);
    },
    topicBySlug: (root, { slugName }, context) => {
        return context.models.ForumTopics.getTopicBySlug(slugName);
    },
    postByTopic: async (root, { slug, skipLength, pageSize }, context) => {
        const topic = await context.models.ForumTopics.getTopicBySlug(slug);
        return context.models.PostModel.getAllByTopic(topic, skipLength, pageSize);
    }

}

exports.forumCategoryMutations = {
    createTopic: async (root, { input }, context) => {
        const category = await context.models.ForumCategory.getCategoryBySlug(input.forumCategory);
        if (!category) return null;
        input.forumCategory = category._id;
        const topic = await context.models.ForumTopics.create(input);
        return topic;
    },
    createPost: async (root, { input }, context) => {
        const post = await context.models.PostModel.create(input);
        return post;
    }
}

exports.hightlightQueries = {
    highlight: async (root, { limit }, context) => {
        const topics = await context.models.ForumTopics.getRandom(limit);
        return { topics };
    }
}