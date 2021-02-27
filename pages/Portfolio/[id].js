import axios from 'axios';

const fetchPortfolioById = async (id) => {
    const query = `
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
    let variables = { id };
    try {
        let responseData = await axios.post('http://localhost:3000/graphql', { query, variables })
        return responseData.data.data;
    }
    catch (err) {
        console.log(err);
    }
}

export default function PortfolioDetails({ portfolio }) {
    return (
        <div className="portfolio_main">
            {
                portfolio ?
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
                                            <div className="portfolio_detail_info_subheading">44</div>
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
                                            <div className="portfolio_detail_info_subheading">{portfolio.startDate}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="portfolio_detail_info_container">
                                            <div className="portfolio_detail_info_heading">End Date</div>
                                            <div className="portfolio_detail_info_subheading">{portfolio.endDate}</div>
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
                    : portfolio === null ? <div>Invalid Url</div> : <div>Loading Data...</div>
            }
        </div>
    )
}

PortfolioDetails.getInitialProps = async ({ query }) => {
    let portfolio = await fetchPortfolioById(query.id);
    return { ...portfolio };
}