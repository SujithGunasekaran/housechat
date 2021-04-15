exports.userTypes = `

    type UserFollowingData {
        _id : ID
        name : String
        username : String
    }

    type following {
        _id : ID
        userFollowingId : UserFollowingData
    }

    type followingList {
        userData : [following]
        followingCount : Int
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
