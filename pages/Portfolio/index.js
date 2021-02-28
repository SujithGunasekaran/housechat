import PortfolioCard from '../../Components/portfolio/PortfolioCard';
import Link from 'next/link';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PORTFOLIOS, CREATE_PORTFOLIO, UPDATE_PORTFOLIO, DELETE_PORTFOLIO } from '../../apollo/queries';
import withApollo from '../../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';


const Portfolio = () => {

    const { data } = useQuery(GET_PORTFOLIOS);
    const [updatePortfolio] = useMutation(UPDATE_PORTFOLIO);
    const [deletePortfolio] = useMutation(DELETE_PORTFOLIO, {
        update(cache, { data: { deletePortfolio } }) {
            const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
            const newPortfolios = portfolios.filter((portfolioID) => portfolioID._id !== deletePortfolio);
            cache.writeQuery({
                query: GET_PORTFOLIOS,
                data: { portfolios: newPortfolios }
            })
        }
    });
    const [createPortfolio] = useMutation(CREATE_PORTFOLIO, {
        update(cache, { data: { createPortfolio } }) {
            const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
            cache.writeQuery({
                query: GET_PORTFOLIOS,
                data: { portfolios: [...portfolios, createPortfolio] }
            })
        }
    })

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
                                    <button onClick={() => updatePortfolio({ variables: { id: portfolioInfo._id } })}>Update Portfolio</button>
                                    <button onClick={() => deletePortfolio({ variables: { id: portfolioInfo._id } })}>Delete Portfolio</button>
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