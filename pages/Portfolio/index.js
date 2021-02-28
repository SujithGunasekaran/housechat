import PortfolioCard from '../../Components/portfolio/PortfolioCard';
import Link from 'next/link';
import { useGetPortfolios, useCreatePortfolios, useUpdatePortfolios, useDeletePortfolios } from '../../apollo/actions';
import withApollo from '../../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';


const Portfolio = () => {

    const { data } = useGetPortfolios();
    const [updatePortfolio] = useUpdatePortfolios();
    const [deletePortfolio] = useDeletePortfolios();
    const [createPortfolio] = useCreatePortfolios();

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