exports.userTypes = `

    type following {
        _id : ID,
        name : String,
        username : String,
        email : String,
        following : [following]
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