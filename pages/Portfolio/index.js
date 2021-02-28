import axios from 'axios';
import PortfolioCard from '../../Components/portfolio/PortfolioCard';
import Link from 'next/link';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PORTFOLIOS, CREATE_PORTFOLIO } from '../../apollo/queries';
import withApollo from '../../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';

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


const Portfolio = () => {

    const { data } = useQuery(GET_PORTFOLIOS);
    const [createPortfolio] = useMutation(CREATE_PORTFOLIO, {
        update(cache, { data: { createPortfolio } }) {
            const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
            cache.writeQuery({
                query: GET_PORTFOLIOS,
                data: { portfolios: [...portfolios, createPortfolio] }
            })
        }
    })

    const updatePortfolio = async (id) => {
        await graphUpdatePortfolio(id);

    }

    const deletePortfolio = async (id) => {
        await graphDeletePortfolio(id);
    }

    const portfolios = data ? data.portfolios : [];

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
                            // loading ? <div>Loading....</div> :
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

export default withApollo(Portfolio, { getDataFromTree });