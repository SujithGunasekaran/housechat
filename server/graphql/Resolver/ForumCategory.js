
exports.forumCategoryQueries = {

    forumCategories: (root, args, context) => {
        return context.models.ForumCategory.getAll();
    }
}