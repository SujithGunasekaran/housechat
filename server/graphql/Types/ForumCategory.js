exports.forumTypes = `
    type ForumCategory{
        _id : ID
        title : String
        subTitle : String
        slug : String
    }

    type Author {
        _id : ID
        username : String
    }

    type Topics{
        _id : ID
        title : String
        slug : String
        content : String
        forumCategory : ForumCategory
        user : Author
        createdAt : String
    }

    input TopicInput {
        title : String
        content : String
        forumCategory : String
    }

    type Post {
        _id : ID
        content : String
        slug : String
        fullSlug : String
        topic : Topics
        user : Author
        parent : Post
        createdAt : String
    }

    type paginatePost {
        posts : [Post]
        count : Int
    }

    input PostInput{
        content : String
        parent : String
        topic : String
    }

    type HighlightResponse {
        topics : [Topics]
    }
`;
