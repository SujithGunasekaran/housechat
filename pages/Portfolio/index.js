import PortfolioCard from '../../Components/portfolio/PortfolioCard';
import Link from 'next/link';
import { useGetPortfolios } from '../../apollo/actions';
import withApollo from '../../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import BaseLayout from '../../layouts/BaseLayout';

const Portfolio = () => {

    const { data } = useGetPortfolios();

    const portfolios = data ? data.portfolios : [];

    return (
        <BaseLayout>
            <div>
                <div className="portfolio_main">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="portfolio_heading">Portfolio</div>
                            </div>
                        </div>
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
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}

export default withApollo(Portfolio, { getDataFromTree });