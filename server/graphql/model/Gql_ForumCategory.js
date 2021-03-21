const BaseModel = require('./Gql_BaseMode');
class ForumCategory extends BaseModel {

    getAll() {
        return this.Model.find({});
    }
    getCategoryBySlug(categoryName) {
        return this.Model.findOne({ slug: categoryName }).populate('user');
    }
}

module.exports = ForumCategory;