
class ForumCategory {

    constructor(model) {
        this.Model = model;
    }

    getAll() {
        return this.Model.find({});
    }
    getCategoryBySlug(categoryName) {
        return this.Model.findOne({ slug: categoryName }).populate('user');
    }
}

module.exports = ForumCategory;