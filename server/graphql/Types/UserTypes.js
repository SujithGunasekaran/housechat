exports.userTypes = `
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