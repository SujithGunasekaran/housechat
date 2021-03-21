import { gql } from '@apollo/client';


export const GET_PORTFOLIOBYID = gql`
    query Portfolio($id : ID) {
        portfolio( id : $id ) {
            _id,
            title,
            daysOfExperience @client
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
`;


/* forum category */

export const GET_FORUM_CATEGORY = gql`
    query ForumCategories{
        forumCategories{
            _id
            title
            subTitle
            slug
        }
    }
`;

export const GET_TOPICS_BY_CATEGORY = gql`
    query TopicsByCategory($categoryName : String){
        topicsByCategory(categoryName : $categoryName){
            _id
            title
            content
            slug
            user {
                username
            }
            forumCategory {
                _id
                title
                subTitle
                slug
            }
        }
    }
`;

export const CREATE_TOPIC = gql`
    mutation CreateTopic(
        $title : String
        $content : String
        $forumCategory : String
    ){
        createTopic(input : {
            title : $title
            content : $content
            forumCategory : $forumCategory
        }){
            _id
            title
            content
            slug
            user{
                username
            }
            forumCategory{
                _id
                title
                subTitle
                slug
            }
        }
    }

`;

export const GET_TOPIC_BY_SLUG = gql`
    query TopicBySlug($slugName : String){
        topicBySlug(slugName : $slugName){
            _id
            title
            content
            slug
            user{
                username
            }
            forumCategory{
                _id
                title
                subTitle
                slug
            }
        }
    }
`;

export const GET_POST_BY_TOPIC = gql`
    query PostByTopic($slug: String, $pageNumber : Int, $pageSize : Int){
        postByTopic(slug : $slug, pageNumber : $pageNumber, pageSize : $pageSize){
            posts {
                _id
                content
                slug
                fullSlug
                user{
                    username
                }
                topic {
                    title
                }
                parent {
                    _id
                    content
                    slug
                    user {
                        username
                    }
                }
                createdAt
            }
            count
        }
    }
`;

export const CREATE_POST = gql`
    mutation CreatePost(
        $content : String
        $parent : String
        $topic : String
    ){
        createPost(input : {
            content : $content
            parent : $parent
            topic : $topic
        }){
            _id
            content
            slug
            createdAt
            user {
                username
            }
            parent {
                content
                user {
                    username
                }
            }
        }
    }
`;

export const GET_TOPIC_FOR_HOME_PAGE = gql`
    query Hightlight($limit : Int){
        highlight(limit : $limit){
            topics {
                _id
                title
                slug
                user {
                    username
                }
                forumCategory {
                    title
                }
            }
        }
    }
`;