
exports.forumCategoryQueries = {

    forumCategories: (root, args, context) => {
        return context.models.ForumCategory.getAll();
    },
    topicsByCategory: (root, { categoryID }, context) => {
        return context.models.ForumTopics.getAllTopicsByCategory(categoryID)
    }
}