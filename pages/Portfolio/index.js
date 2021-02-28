import axios from 'axios';
import PortfolioCard from '../../Components/portfolio/PortfolioCard';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_PORTFOLIOS, CREATE_PORTFOLIO } from '../../apollo/queries';

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


export default function Portfolio() {

    const [portfolios, setPortfolios] = useState([]);

    const [getPortfolios, { loading, data }] = useLazyQuery(GET_PORTFOLIOS);
    const [createPortfolio] = useMutation(CREATE_PORTFOLIO, {
        update(cache, { data: { createPortfolio } }) {
            const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
            cache.writeQuery({
                query: GET_PORTFOLIOS,
                data: { portfolios: [...portfolios, createPortfolio] }
            })
        }
    })

    useEffect(() => {
        getPortfolios();
    }, [])

    if (data && (portfolios.length === 0 || data.portfolios.length !== portfolios.length)) {
        setPortfolios(data.portfolios);
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
                            loading ? <div>Loading....</div> :
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
