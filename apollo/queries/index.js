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