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
        userFollowersData : [follower] 
    }

    input followingInput {
        userInfo : ID,
        userFollowingInfo : ID
    }

    type followers {
        _id : ID,
        name : String,
        username : String,
        email : String
    }

    type userFollowAndFollowingCount {
        followingCount : Int
        followersCount : Int
    }

    type User {
        _id : ID,
        name : String,
        username : String,
        email : String,
        role : String
    }

    type userInfo {
        userData : User
        followingCount : Int
        followersCount : Int
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
