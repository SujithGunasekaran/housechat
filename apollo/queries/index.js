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
    mutation CreatePortfolio{
        createPortfolio(input : {
            title: "New Title",
            company: "New Compant",
            companyWebsite: "https://www.google.com",
            location: "New Location",
            jobTitle: "New JobTitle",
            description: "New Description",
            startDate: "01/01/2010",
            endDate: "01/01/2011"
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
    mutation UpdatePortfolios( $id : ID ){
        updatePortfolio(id : $id, input : {
            title: "Updated Title",
            company: "Updated Compant",
            companyWebsite: "https://www.google.com",
            location: "Updated Location",
            jobTitle: "Updated JobTitle",
            description: "Updated Description",
            startDate: "01/01/2010",
            endDate: "01/01/2011"
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
`