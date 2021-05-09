import { gql } from '@apollo/client';

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

export const FORGOT_USER = gql`
    mutation ForgotUser($email : String) {
        forgotUser(input : {
            email : $email
        })
    }
`;

export const FORGOT_USER_PASSWORD = gql`
    mutation ForgotUserPassword($email : String!, $password : String!) {
        forgotPassword(input : {
            email : $email
            password : $password
        })
    }
`



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
                _id
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
    query PostByTopic($slug: String, $skipLength : Int, $pageSize : Int){
        postByTopic(slug : $slug, skipLength : $skipLength, pageSize : $pageSize){
            posts {
                _id
                content
                slug
                fullSlug
                user{
                    _id
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
                        _id
                        username
                    }
                    createdAt
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
                content
                slug
                user {
                    username
                }
                createdAt
            }
        }
    }
`;

/* User Profile queries */

export const GET_USER_INFO = gql`
    query GetUserInfo($userId : ID){
        getUserInfo(userId : $userId){
            userData {
                _id
                username
                name
                email
                bio
                company
                location
            }
            followingCount
            followersCount
            showFollow
        }
    }
`;

export const GET_USER_FOLLOWING = gql`
    query GetUserFollowing($userId : ID) {
        getUserFollowing(userId : $userId){
            userFollowingData {
                userFollowingInfo {
                  _id
                  username
                  name
                }
            }
        }
    }
`;

export const GET_USER_FOLLOWER = gql`
    query GetUserFollower($userId : ID){
        getUserFollowers(userId : $userId) {
            userFollowersData {
              userInfo {
                _id
                username
                name
              }
            }
        }
    }
`;

export const DELETE_FOLLOWING_USER = gql`
    mutation DeleteUserFollowing($userInfo : ID $userFollowingInfo : ID){
        deleteUserFollowing(input : {
            userInfo : $userInfo userFollowingInfo : $userFollowingInfo
        }){
            userInfo
            userFollowingInfo
        }
    }
`;

export const FOLLOW_USER = gql`
    mutation FollowUser($userInfo : ID, $userFollowingInfo : ID){
        followUser(input : {
            userInfo : $userInfo
            userFollowingInfo : $userFollowingInfo
        }){
            userInfo {
                _id
                username
                name
            }
            userFollowingInfo {
                _id
                username
                name
            }
        }
    }
`;

export const EDIT_USER_INFO = gql`
    mutation UpdateUser(
        $userId : ID
        $username : String!
        $name : String!
        $email : String!
        $bio : String
        $company : String
        $location : String
    ){
        updateUser(
            userId : $userId
            input : {
                username : $username
                name : $name
                email : $email
                bio : $bio
                company : $company
                location : $location
            }
        ){
            _id
            name
            username
            email
            role
            bio
            company
            location
        }
    }
`;

/* User Profile queries  */

