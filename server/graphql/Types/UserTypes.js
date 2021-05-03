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
        userFollowingInfo : UserFollowingsData
    }

    type follower {
        userInfo : UserFollowerData
    }

    type followingList {
        userFollowingData : [following]
    }

    type follwersList {
        userFollowersData : [follower] 
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
        bio : String
        company : String
        location : String
    }

    type userInfo {
        userData : User
        followingCount : Int
        followersCount : Int
        showFollow : Boolean
    }

    input signUpInput {
        avatar : String
        username : String!
        name : String
        email : String!
        password : String!
        passwordConfirmation : String!
    }

    input updateUserInput {
        username : String!
        name : String!
        email : String!
        bio : String
        company : String
        location : String
    }

    input signInInput {
        email : String!
        password : String!
    }

    type userFollowId {
        userInfo : UserFollowerData
        userFollowingInfo : UserFollowingsData
    }

    type userId {
        userInfo : ID
        userFollowingInfo : ID
    }

    input deleteUserInput {
        userInfo : ID
        userFollowingInfo : ID
    }

    input followUserInput {
        userInfo : ID
        userFollowingInfo : ID
    } 

`
