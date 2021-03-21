
class BaseModel {
    constructor(model, user) {
        this.Model = model;
        this.user = user;
    }

    async getRandom(limit) {
        const count = await this.Model.countDocuments();
        let randomIndex;
        if (limit > count) {
            randomIndex = 0;
        }
        else {
            randomIndex = count - limit;
        }
        let randomNumber = Math.round(Math.random() * randomIndex);
        return () => this.Model.find({}).skip(randomNumber).limit(limit);
    }
}

module.exports = BaseModel;