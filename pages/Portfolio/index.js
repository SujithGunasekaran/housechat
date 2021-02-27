import axios from 'axios';
import PortfolioCard from '../../Components/portfolio/PortfolioCard';
import Link from 'next/link';
import { useState } from 'react';

const fetchPortfolios = async () => {
    const query = `
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
    `
    try {
        let responseData = await axios.post('http://localhost:3000/graphql', { query })
        return responseData.data.data;
    }
    catch (err) {
        console.log(err);
    }
}

const graphCreatePortfolio = async () => {
    const query = `
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
    try {
        let responseData = await axios.post('http://localhost:3000/graphql', { query });
        return responseData.data.data.createPortfolio;
    }
    catch (err) {
        return err;
    }
}

const graphUpdatePortfolio = async (id) => {
    const query = `
            mutation UpdatePortfolios{
                updatePortfolio(id : "${id}", input : {
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
    try {
        let responseData = await axios.post('http://localhost:3000/graphql', { query })
        return responseData.data.data.updatePortfolio;
    }
    catch (err) {
        console.log(err);
    }
}

const graphDeletePortfolio = async (id) => {
    const query = `
        mutation DeletePortfolio{
            deletePortfolio(id : "${id}")
        }
    `;
    try {
        let responseData = await axios.post('http://localhost:3000/graphql', { query })
        return responseData.data.data.deletePortfolio;
    }
    catch (err) {
        console.log(err);
    }
}


export default function Portfolio({ data }) {

    const [portfolios, setPortfolios] = useState(data.portfolios);

    const createPortfolio = async () => {
        try {
            let responseData = await graphCreatePortfolio()
            let newPortfolio = [...portfolios, responseData];
            setPortfolios(newPortfolio);
        }
        catch (err) {
            console.log(err);
        }
    }

    const updatePortfolio = async (id) => {
        try {
            let responseData = await graphUpdatePortfolio(id);
            let index = portfolios.findIndex((portfolioInfo) => portfolioInfo._id === responseData._id);
            let newPortfolio = portfolios.slice();
            newPortfolio[index] = { ...newPortfolio[index], ...responseData };
            setPortfolios(newPortfolio);
        }
        catch (err) {
            console.log(err);
        }
    }

    const deletePortfolio = async (id) => {
        try {
            let responseID = await graphDeletePortfolio(id);
            let index = portfolios.findIndex((portfolioId) => portfolioId._id === responseID)
            let newPortfolio = portfolios.slice();
            newPortfolio.splice(index, 1);
            setPortfolios(newPortfolio);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <div className="portfolio_main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="portfolio_heading">Portfolio</div>
                        </div>
                    </div>
                    <button onClick={createPortfolio} >CreatePortfolio</button>
                    <div className="row">
                        {
                            portfolios.map((portfolioInfo) => (
                                <div className="col-md-4" key={portfolioInfo._id}>
                                    <Link
                                        href='/Portfolio/[id]'
                                        as={`/Portfolio/${portfolioInfo._id}`}
                                    >
                                        <a>
                                            <PortfolioCard portfolioInfo={portfolioInfo} />
                                        </a>
                                    </Link>
                                    <button onClick={() => updatePortfolio(portfolioInfo._id)}>Update Portfolio</button>
                                    <button onClick={() => deletePortfolio(portfolioInfo._id)}>Delete Portfolio</button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

Portfolio.getInitialProps = async () => {
    let portfolios = await fetchPortfolios();
    return { data: { ...portfolios } };
}
