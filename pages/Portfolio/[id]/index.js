import { useGetPortfolioById } from '../../../apollo/actions';
import withApollo from '../../../hoc/withApollo';
import { getDataFromTree } from '@apollo/client/react/ssr';
import BaseLayout from '../../../layouts/BaseLayout';
import { formatDate } from '../../../utils/Function';

function PortfolioDetails({ query }) {

    const { data } = useGetPortfolioById(query.id);
    const portfolio = data && data.portfolio || {};
    return (
        <BaseLayout>
            <div className="portfolio_main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <div className="portfolio_detail_head_container">
                                <div className="portfolio_detail_head_heading">{portfolio.title}</div>
                                <div className="portfolio_detail_head_subheading">{portfolio.jobTitle}</div>
                                <button className="portfolio_detail_head_btn">
                                    <a href={portfolio.companyWebsite} target="_blank">See Company</a>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="portfolio_detail_info_container">
                                        <div className="portfolio_detail_info_heading">Location</div>
                                        <div className="portfolio_detail_info_subheading">{portfolio.location}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="portfolio_detail_info_container">
                                        <div className="portfolio_detail_info_heading">Days</div>
                                        <div className="portfolio_detail_info_subheading">{portfolio.daysOfExperience}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="portfolio_detail_info_container">
                                        <div className="portfolio_detail_info_heading">Start Date</div>
                                        <div className="portfolio_detail_info_subheading">{formatDate(portfolio.startDate)}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="portfolio_detail_info_container">
                                        <div className="portfolio_detail_info_heading">End Date</div>
                                        <div className="portfolio_detail_info_subheading">{portfolio.endDate ? formatDate(portfolio.endDate) : 'Present'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <div className="portfolio_detail_info_container">
                                <div className="portfolio_detail_info_heading">Description</div>
                                <div className="portfolio_detail_info_subheading">{portfolio.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}

PortfolioDetails.getInitialProps = ({ query }) => {
    return { query };
}

export default withApollo(PortfolioDetails, { getDataFromTree });