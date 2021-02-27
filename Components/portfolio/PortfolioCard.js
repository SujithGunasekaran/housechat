export default function PortfolioCard({ portfolioInfo }) {
    return (
        <div className="portfolio_card_container">
            <div className="portfolio_card_body">
                <div className="portfolio_card_body_title">{portfolioInfo.title}</div>
                <div className="portfolio_card_body_sub_title">{portfolioInfo.jobTitle}</div>
                <div className="portfolio_card_body_info">{portfolioInfo.description}</div>
            </div>
            <div className="portfolio_card_footer">{portfolioInfo.startDate} - {portfolioInfo.endDate}</div>
        </div>
    )
}