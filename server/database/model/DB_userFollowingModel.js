const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserFollowingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userFollowingId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('userFollowings', UserFollowingSchema);
