exports.userTypes = `

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