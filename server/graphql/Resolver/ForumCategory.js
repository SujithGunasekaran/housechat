
exports.forumCategoryQueries = {

    forumCategories: (root, args, context) => {
        return context.models.ForumCategory.getAll();
    },
    topicsByCategory: async (root, { categoryName }, context) => {
        let forumCategory = await context.models.ForumCategory.getCategoryBySlug(categoryName);
        if (!forumCategory) return null;
        return context.models.ForumTopics.getAllTopicsByCategory(forumCategory._id);
    }
}