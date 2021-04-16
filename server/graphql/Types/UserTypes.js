exports.userTypes = `

    type UserFollowingsData {
        _id : ID
        name : String
        username : String
    }

    type UserFollowerData {
        _id : ID
        name : String
        username : String
    }

    type following {
        _id : ID
        userFollowingInfo : UserFollowingsData
    }

    type follower {
        _id : ID
        userInfo : UserFollowerData
    }

    type followingList {
        userFollowingData : [following]
        userFollowersData : [follower]
        followingCount : Int
        followersCount : Int 
    }

    input followingInput {
        userId : ID,
        userFollowingId : ID
    }

    type followers {
        _id : ID,
        name : String,
        username : String,
        email : String
    }

    type User {
        _id : ID,
        name : String,
        username : String,
        email : String,
        role : String
    }

    input signUpInput {
        avatar : String
        username : String!
        name : String
        email : String!
        password : String!
        passwordConfirmation : String!
    }

    input signInInput {
        email : String!
        password : String!
    }
`
