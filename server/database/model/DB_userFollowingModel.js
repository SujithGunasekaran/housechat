const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserFollowingSchema = new Schema({
    userInfo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userFollowingInfo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('userFollowings', UserFollowingSchema);
