import { gql } from '@apollo/client';


export const GET_PORTFOLIOBYID = gql`
    query Portfolio($id : ID) {
        portfolio( id : $id ) {
            _id,
            title,
            company,
            companyWebsite,
            location,
            jobTitle,
            description,
            startDate,
            endDate
        }
    }
`;

export const GET_PORTFOLIOS = gql`
    query Portfolios {
        portfolios {
            _id,
            title,
            company,
            companyWebsite,
            location,
            jobTitle,
            description,
            startDate,
            endDate
        }
    }
`;

export const CREATE_PORTFOLIO = gql`
    mutation CreatePortfolio(
        $title: String
        $company: String
        $companyWebsite: String
        $location: String
        $jobTitle: String
        $description: String
        $startDate : String
        $endDate: String
    ){
        createPortfolio(input : {
            title: $title
            company: $company
            companyWebsite: $companyWebsite
            location: $location
            jobTitle: $jobTitle
            description: $description
            startDate : $startDate
            endDate: $endDate
        })
        {
            _id
            title
            company
            companyWebsite
            location
            jobTitle
            description
            startDate
            endDate
        }
    }
`;

export const UPDATE_PORTFOLIO = gql`
    mutation UpdatePortfolios( 
        $id : ID
        $title: String
        $company: String
        $companyWebsite: String
        $location: String
        $jobTitle: String
        $description: String
        $startDate : String
        $endDate: String 
        ){
        updatePortfolio(id : $id, input : {
            title: $title
            company: $company
            companyWebsite: $companyWebsite
            location: $location
            jobTitle: $jobTitle
            description: $description
            startDate : $startDate
            endDate: $endDate
        })
        {
            _id
            title
            company
            companyWebsite
            location
            jobTitle
            description
            startDate
            endDate
        }
    }
`;

export const DELETE_PORTFOLIO = gql`
    mutation DeletePortfolio( $id : ID ){
        deletePortfolio(id : $id)
    }
`;

// AUTH QUIRES

export const SIGNUP = gql`
    mutation SignUp(
        $username : String!,
        $email : String!,
        $password : String!,
        $passwordConfirmation : String!
    ){
        signUp(input : {
            username : $username,
            email : $email,
            password : $password,
            passwordConfirmation : $passwordConfirmation
        })
    }
`;

export const SIGN_IN = gql`
    mutation Signin(
        $email : String!
        $password : String!
    ){
        signIn(input : {
            email : $email
            password : $password
        }){
            _id
            username
            role
        }
    }
`;

export const GET_USER = gql`
    query User{
        user{
            _id
            username
            role
        }
    }
`;

export const SIGN_OUT = gql`
    mutation Signout{
        signOut
    }
`;

export const GET_USERPORTFOLIO = gql`
    query Userportfolio{
        userPortfolio{
            _id,
            title,
            jobTitle,
            startDate,
            endDate
        }
    }
`