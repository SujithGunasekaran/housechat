const mongoose = require('mongoose');
const moment = require('moment');

const userOneId = mongoose.Types.ObjectId();
const userTwoId = mongoose.Types.ObjectId();

const forumOneId = mongoose.Types.ObjectId();
const forumTwoId = mongoose.Types.ObjectId();
const forumThreeId = mongoose.Types.ObjectId();

const topicOneId = mongoose.Types.ObjectId();

const postOneId = mongoose.Types.ObjectId();
const postOneCreatedAt = moment().subtract(7, 'days');

const postTwoId = mongoose.Types.ObjectId();
const postTwoCreatedAt = moment(postOneCreatedAt).add(1, 'days');

const postThreeId = mongoose.Types.ObjectId();
const postThreeCreatedAt = moment(postTwoCreatedAt).add(1, 'days');

const postFourId = mongoose.Types.ObjectId();
const postFourCreatedAt = moment(postThreeCreatedAt).add(1, 'days');

const data = {
    Users: [
        {
            _id: userOneId,
            name: "Sujith",
            email: "sujith@gmail.com",
            username: "sujith",
            info: "Hello I am Sujith and I am developer",
            password: "password123",
            role: "admin",
            followers: [userTwoId],
            following: [userTwoId]
        },
        {
            _id: userTwoId,
            name: "test",
            email: "test@gmail.com",
            username: "test99",
            password: "password123",
            info: "Hello I am testUser",
            followers: [userOneId],
            following: [userOneId]
        }
    ],
    Portfolios: [
        {
            title: 'Job in Netcentric',
            company: 'Netcentric',
            companyWebsite: 'https://www.google.com',
            location: 'Spain, Barcelona',
            jobTitle: 'Engineer',
            description: 'Doing something, programing....',
            startDate: '01/01/2014',
            endDate: '01/01/2016',
            user: userOneId
        },
        {
            title: 'Job in Siemens',
            company: 'Siemens',
            companyWebsite: 'https://www.google.com',
            location: 'Slovakia, Kosice',
            jobTitle: 'Software Engineer',
            description: 'Responsible for parsing framework for JSON medical data.',
            startDate: '01/01/2011',
            endDate: '01/01/2013',
            user: userOneId
        },
        {
            title: 'Work in USA',
            company: 'WhoKnows',
            companyWebsite: 'https://www.google.com',
            location: 'USA, Montana',
            jobTitle: 'Full Stack Developer',
            description: 'Building Responsive and Configurable Website',
            startDate: '01/01/2010',
            endDate: '01/01/2011',
            user: userOneId
        }
    ],
    forumCategories: [
        {
            _id: forumOneId,
            title: "General Discussion",
            subTitle: "Open any topic you want",
            slug: "general-discussion"
        },
        {
            _id: forumTwoId,
            title: "Technical Questions",
            subTitle: "Ask some questions, and get answer from experts",
            slug: "technical-questions"
        },
        {
            _id: forumThreeId,
            title: "Developer Jokes",
            subTitle: "Just funny developer stuffs",
            slug: "developer-jokes"
        }
    ],
    topics: [
        {
            _id: topicOneId,
            title: 'How to learn JS',
            slug: "how-to-learn-js",
            content: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            forumCategory: forumOneId,
            user: userOneId
        },
        {
            title: 'How to learn JAVA',
            slug: "how-to-learn-java",
            content: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            forumCategory: forumOneId,
            user: userOneId
        },
        {
            title: 'How to learn C++',
            slug: "how-to-learn-c++",
            content: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            forumCategory: forumOneId,
            user: userOneId
        }
    ],
    posts: [
        {
            _id: postOneId,
            content: 'Hey there how are you ?',
            slug: 'md43',
            fullSlug: postOneCreatedAt.toISOString() + ':md43',
            topic: topicOneId,
            user: userOneId,
            createdAt: postOneCreatedAt
        },
        {
            _id: postTwoId,
            content: 'What do you think about this?',
            slug: 'md59',
            fullSlug: postTwoCreatedAt.toISOString() + ':md59',
            topic: topicOneId,
            user: userTwoId,
            createdAt: postTwoCreatedAt
        },
        {
            _id: postThreeId,
            content: 'I think its nice (:',
            slug: 'md59/md79',
            fullSlug: postTwoCreatedAt.toISOString() + ':md59' + '/' + postThreeCreatedAt.toISOString() + ':md79',
            topic: topicOneId,
            user: userOneId,
            parent: postTwoId,
            createdAt: postThreeCreatedAt
        },
        {
            _id: postFourId,
            content: 'Good to hear that!',
            slug: 'md59/md79/md89',
            fullSlug: postTwoCreatedAt.toISOString() + ':md59' + '/' + postThreeCreatedAt.toISOString() + ':md79' + '/' + postFourCreatedAt.toISOString() + ':md89',
            topic: topicOneId,
            user: userTwoId,
            parent: postThreeId,
            createdAt: postFourCreatedAt
        },
    ]
}

module.exports = data;