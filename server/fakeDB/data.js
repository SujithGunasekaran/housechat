const mongoose = require('mongoose');

const userOneId = mongoose.Types.ObjectId();
const userTwoId = mongoose.Types.ObjectId();


const data = {
    Users: [
        {
            _id: userOneId,
            name: "Sujith",
            email: "sujith@gmail.com",
            username: "sujith",
            info: "Hello I am Sujith and I am developer",
            password: "password123",
            role: "admin"
        },
        {
            _id: userTwoId,
            name: "test",
            email: "test@gmail.com",
            username: "test99",
            password: "password123",
            info: "Hello I am testUser"
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
    ]
}

module.exports = data;